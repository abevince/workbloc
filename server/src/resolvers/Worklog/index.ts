import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../../context";
import { Worklog } from "../../schema/Worklog.schema";
import { isToday } from "../../utils/isToday";
import { WorklogUniqueInput } from "./inputs";

@Resolver(Worklog)
export class WorklogResolver {
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
  // @Query()
  // worklogs() {}

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
