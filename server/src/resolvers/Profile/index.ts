import { Context } from "../../context";
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
import { CreateProfileInput } from "./inputs";
import { isAuth } from "../../middleware/isAuth";
import { Profile } from "../../schema/Profile.schema";
import { User } from "../../schema/User.schema";

@Resolver(Profile)
export class ProfileResolver {
  @Query()
  helloProfile(): string {
    console.log("hey");
    return "hello world";
  }

  @FieldResolver(() => User, { nullable: true })
  user(@Root() profile: Profile, @Ctx() ctx: Context): Promise<User | null> {
    return ctx.prisma.user.findUnique({
      where: { id: profile.userId },
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

  @Query(() => Profile, { nullable: true })
  @UseMiddleware(isAuth)
  async userProfile(@Ctx() ctx: Context): Promise<Profile | null> {
    const profile = await ctx.prisma.profile.findFirst({
      where: { userId: ctx.auth.user?.id },
    });
    return profile;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async createProfile(
    @Arg("data") data: CreateProfileInput,
    @Ctx() ctx: Context
  ): Promise<boolean> {
    const profile = await ctx.prisma.profile.findFirst({
      where: { userId: ctx.auth.user?.id },
      select: { id: true },
    });
    if (profile) return false;
    console.log(ctx.auth.user?.id);
    const x = await ctx.prisma.profile.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        user: {
          connect: {
            id: ctx.auth.user?.id,
          },
        },
      },
    });
    return !!x;
  }
}
