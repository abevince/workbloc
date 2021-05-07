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
import { Worklog } from "../../schema/Worklog.schema";
import { authorizeUser } from "../../utils/authorizeUser";
import { createSession } from "../../utils/createSession";
import { logoutUser } from "../../utils/logoutUser";
import { setTokenToCookie } from "../../utils/setTokensToCookie";
import { CreateUserInput, LoginUserInput, UserUniqueInput } from "./inputs";
import { validateCreateUserInput } from "./validation/createUser.validation";

@Resolver(User)
export class UserResolver {
  @Query()
  hello(): string {
    console.log("hey");
    return "hello world";
  }

  @FieldResolver()
  worklog(
    @Root() user: User,
    @Ctx() { prisma }: Context
  ): Promise<Worklog[] | null> {
    return prisma.user
      .findUnique({
        where: { id: user.id },
      })
      .Worklog({});
  }

  @FieldResolver(() => Profile, { nullable: true })
  profile(
    @Root() user: User,
    @Ctx() { prisma }: Context
  ): Promise<Profile | null> {
    return prisma.user
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

  @Query()
  @UseMiddleware(isAuth)
  isLoggedIn(): boolean {
    return true;
  }

  @Query(() => UserResponse)
  @UseMiddleware(isAuth)
  async me(@Ctx() { auth, prisma }: Context): Promise<UserResponse> {
    try {
      if (!auth.user) {
        return {
          errors: [
            {
              field: "auth",
              message: "You're not logged in",
            },
          ],
        };
      }

      const user = await prisma.user.findUnique({
        where: { id: auth.user.id },
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
  users(@Ctx() { prisma }: Context): Promise<User[]> {
    return prisma.user.findMany({
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
    @Ctx() { prisma }: Context
  ): Promise<User | null> {
    return prisma.user.findUnique({
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
  async createUser(
    @Arg("data") data: CreateUserInput,
    @Ctx() { prisma }: Context
  ): Promise<UserResponse> {
    const validationErrors = validateCreateUserInput(data);
    if (validationErrors.length > 0) {
      return { errors: validationErrors };
    }
    try {
      const foundUser = await prisma.user.findFirst({
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
      const createdUser = await prisma.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
          profile: {
            create: {
              firstName: data.firstName,
              lastName: data.lastName,
            },
          },
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
    @Arg("data") data: LoginUserInput,
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
