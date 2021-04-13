import argon2 from "argon2";
import { Resolver, Query, Mutation, Arg, Ctx } from "type-graphql";
import { Context } from "../../context";

import { User, UserResponse } from "../../schema/User.schema";
import { UserInput, UserUniqueInput } from "./inputs";

@Resolver()
export class UserResolver {
  @Query()
  hello(): string {
    console.log("hey");
    return "hello world";
  }

  @Query(() => [User])
  async users(@Ctx() ctx: Context): Promise<User[]> {
    const users = ctx.prisma.user.findMany();
    return users;
  }
  @Query(() => User, { nullable: true })
  async user(
    @Arg("where") where: UserUniqueInput,
    @Ctx() ctx: Context
  ): Promise<User | null> {
    const user = ctx.prisma.user.findUnique({ where });
    return user;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("data") data: UserInput,
    @Ctx() ctx: Context
  ): Promise<UserResponse> {
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
}
