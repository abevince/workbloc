import { Context } from "../../context";
import {
  Arg,
  Args,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import {
  CreateProfileInput,
  FindManyProfileArgs,
  UpdateProfileInput,
} from "./inputs";
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
  user(
    @Root() profile: Profile,
    @Ctx() { prisma }: Context
  ): Promise<User | null> {
    return prisma.user.findUnique({
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
  async userProfile(@Ctx() { auth, prisma }: Context): Promise<Profile | null> {
    const profile = await prisma.profile.findFirst({
      where: { userId: auth.user?.id },
    });
    return profile;
  }

  @Query(() => [Profile])
  profiles(
    @Ctx() { prisma }: Context,
    @Args() args: FindManyProfileArgs
  ): Promise<Profile[]> {
    return prisma.profile.findMany(args);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async createUserProfile(
    @Arg("data") data: CreateProfileInput,
    @Ctx() { auth, prisma }: Context
  ): Promise<boolean> {
    const profile = await prisma.profile.findFirst({
      where: { userId: auth.user?.id },
      select: { id: true },
    });
    if (profile) return false;
    const createdProfile = await prisma.profile.create({
      data: {
        ...data,
        user: {
          connect: {
            id: auth.user?.id,
          },
        },
      },
    });
    return !!createdProfile;
  }

  @Mutation(() => Boolean)
  async updateUserProfile(
    @Arg("args") args: UpdateProfileInput,
    @Ctx() { prisma }: Context
  ): Promise<boolean> {
    const updatedProfile = await prisma.profile.update({
      where: { id: args.where.id },
      data: {
        ...args.data,
      },
    });
    return !!updatedProfile;
  }
}
