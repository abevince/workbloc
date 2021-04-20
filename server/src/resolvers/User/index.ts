import argon2 from "argon2";
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  Ctx,
  UseMiddleware,
} from "type-graphql";

import { Context } from "../../context";

import { User, UserResponse } from "../../schema/User.schema";
import { UserInput, UserUniqueInput } from "./inputs";
import { validateRegisterInput } from "./validation/register.validation";
import { createSession } from "../../utils/createSession";
import { setTokenToCookie } from "../../utils/setTokensToCookie";
import { authorizeUser } from "../../utils/authorizeUser";
import { isAuth } from "../../middleware/isAuth";

@Resolver()
export class UserResolver {
  @Query()
  hello(): string {
    console.log("hey");
    return "hello world";
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
}
