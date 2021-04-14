import argon2 from "argon2";
import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
import { Context } from "../../context";

import { User, UserResponse } from "../../schema/User.schema";
import { UserInput, UserUniqueInput } from "./inputs";
import { validateRegisterInput } from "./validation/register.validation";

@Resolver()
export class UserResolver {
  @Query()
  hello(): string {
    console.log("hey");
    return "hello world";
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
    @Ctx() ctx: Context
  ): Promise<UserResponse> {
    try {
      const foundUser = await ctx.prisma.user.findFirst({
        where: { email: data.email },
      });
      if (!foundUser) {
        return {
          errors: [
            {
              field: "login",
              message: "Invalid email or password",
            },
          ],
        };
      }
      const valid = await argon2.verify(foundUser.password, data.password);
      if (!valid) {
        return {
          errors: [
            {
              field: "login",
              message: "Invalid email or password",
            },
          ],
        };
      }
      return { user: foundUser };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
