import argon2 from "argon2";
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { Context } from "../../context";
import { isAuth } from "../../middleware/isAuth";
import { Profile } from "../../schema/Profile.schema";
import { User, UserResponse } from "../../schema/User.schema";
import { authorizeUser } from "../../utils/authorizeUser";
import { createSession } from "../../utils/createSession";
import { logoutUser } from "../../utils/logoutUser";
import { setTokenToCookie } from "../../utils/setTokensToCookie";
import { UserInput, UserUniqueInput } from "./inputs";
import { validateRegisterInput } from "./validation/register.validation";

@Resolver(User)
export class UserResolver {
  @Query()
  hello(): string {
    console.log("hey");
    return "hello world";
  }

  @FieldResolver(() => Profile, { nullable: true })
  profile(@Root() user: User, @Ctx() ctx: Context): Promise<Profile | null> {
    return ctx.prisma.user
      .findUnique({
        where: { id: user.id },
        select: {
          id: true,
          email: true,
          role: true,
          createdAt: true,
          updatedAt: true,
          status: true,
          suspensionReason: true,
        },
      })
      .profile({});
  }

  @Query(() => Boolean)
  @UseMiddleware(isAuth)
  isLoggedIn(): boolean {
    return true;
  }

  @Query(() => UserResponse)
  @UseMiddleware(isAuth)
  async me(@Ctx() ctx: Context): Promise<UserResponse> {
    try {
      if (!ctx.auth.user) {
        return {
          errors: [
            {
              field: "auth",
              message: "You're not logged in",
            },
          ],
        };
      }

      const user = await ctx.prisma.user.findUnique({
        where: { id: ctx.auth.user.id },
      });
      if (!user) {
        return {
          errors: [
            {
              field: "user",
              message: "User not found",
            },
          ],
        };
      }

      return { user };
    } catch (error) {
      console.log(error);
      throw Error(error);
    }
  }

  @Query(() => [User])
  users(@Ctx() ctx: Context): Promise<User[]> {
    return ctx.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        status: true,
        suspensionReason: true,
      },
    });
  }
  @Query(() => User, { nullable: true })
  user(
    @Arg("where") where: UserUniqueInput,
    @Ctx() ctx: Context
  ): Promise<User | null> {
    return ctx.prisma.user.findUnique({
      where,
      select: {
        id: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        status: true,
        suspensionReason: true,
      },
    });
  }
  // TODO: All users with pagination and search

  @Mutation(() => UserResponse)
  async register(
    @Arg("data") data: UserInput,
    @Ctx() ctx: Context
  ): Promise<UserResponse> {
    const errors = validateRegisterInput(data);
    if (errors) {
      return errors;
    }
    try {
      const foundUser = await ctx.prisma.user.findFirst({
        where: { email: data.email },
        select: { id: true },
      });

      if (foundUser) {
        return {
          errors: [
            {
              field: "email",
              message: "Email is taken or unavailable",
            },
          ],
        };
      }

      const hashedPassword = await argon2.hash(data.password);
      const createdUser = await ctx.prisma.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
        },
      });
      if (!createdUser) throw new Error();
      return { user: createdUser };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("data") data: UserInput,
    @Ctx() { prisma, request, reply, redis }: Context
  ): Promise<UserResponse> {
    try {
      const { isAuthorized, user } = await authorizeUser(prisma, data);
      if (!isAuthorized || !user) {
        return {
          errors: [
            {
              field: "login",
              message: "Invalid email or password",
            },
          ],
        };
      }

      if (user.status === "SUSPENDED") {
        return {
          errors: [
            {
              field: "login",
              message:
                "Your account is suspended. Can't proceed with the login.",
            },
          ],
        };
      }

      const connectionInformation = {
        ip: request.ip,
        userAgent: request.headers["user-agent"],
      };

      const sessionToken = createSession(redis, user.id, connectionInformation);

      setTokenToCookie({
        sessionToken,
        reply,
      });

      return { user: user };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  logout(@Ctx() { reply, redis, auth }: Context): boolean {
    return logoutUser({ sessionId: auth.sessionToken, redis, reply });
  }

  // TODO: Create admin user
  // TODO: Delete user (ADMIN)
  // TODO: Change user password
  // TODO: Change user status (ADMIN)
}
