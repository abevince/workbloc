import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Context } from "../../context";
import { User } from "../../schema/User.schema";
import { Worklog } from "../../schema/Worklog.schema";
import { WorklogItem } from "../../schema/WorklogItems.schema";
import { isToday } from "../../utils/isToday";
import { WorklogUniqueInput } from "./inputs";

@Resolver(Worklog)
export class WorklogResolver {
  @FieldResolver(() => User, { nullable: true })
  user(
    @Root() worklog: Worklog,
    @Ctx() { prisma }: Context
  ): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id: worklog.userId },
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

  @FieldResolver(() => WorklogItem, { nullable: true })
  worklogItem(
    @Root() worklog: Worklog,
    @Ctx() { prisma }: Context
  ): Promise<WorklogItem[] | null> {
    return prisma.worklog
      .findUnique({
        where: { id: worklog.id },
      })
      .WorklogItem({});
  }

  @Query(() => Worklog, { nullable: true })
  async worklog(
    @Arg("where") { id }: WorklogUniqueInput,
    @Ctx() { prisma }: Context
  ): Promise<Worklog | null> {
    return prisma.worklog.findUnique({
      where: { id },
    });
  }
  // TODO: Get worklog/s. With dynamic filtering and pagination
  @Query(() => [Worklog])
  async worklogs(@Ctx() { prisma }: Context): Promise<Worklog[] | null> {
    const worklogs = prisma.worklog.findMany();
    if (!worklogs) return null;
    return worklogs;
  }

  @Mutation(() => Boolean)
  async createWorklog(@Ctx() { auth, prisma }: Context): Promise<boolean> {
    const worklog = await prisma.worklog.findFirst({
      where: { userId: auth.user?.id },
      select: { createdAt: true },
      orderBy: { id: "desc" },
    });

    if (worklog) {
      if (isToday(worklog.createdAt)) {
        return false;
      }
    }

    const createdWorklog = await prisma.worklog.create({
      data: {
        user: {
          connect: {
            id: auth.user?.id,
          },
        },
      },
    });
    return !!createdWorklog;
  }
}
