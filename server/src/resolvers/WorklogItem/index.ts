import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../../context";
import {
  CreateWorklogItemInput,
  ParentWorklogItemInput,
  WorklogItem,
  WorklogItemUniqueInput,
} from "../../schema/WorklogItems.schema";

@Resolver()
export class WorklogItemResolver {
  @Query(() => WorklogItem, { nullable: true })
  worklogItem(
    @Arg("where") where: WorklogItemUniqueInput,
    @Ctx() { prisma }: Context
  ): Promise<WorklogItem | null> {
    return prisma.worklogItem.findUnique({ where: { id: where.id } });
  }
  @Query(() => [WorklogItem], { nullable: true })
  worklogItems(
    @Arg("where") where: ParentWorklogItemInput,
    @Ctx() { prisma }: Context
  ): Promise<WorklogItem[] | null> {
    return prisma.worklogItem.findMany({
      where: {
        worklogId: where.worklogId,
      },
    });
  }
  // TODO: Worklog item input validation
  @Mutation()
  addWorklogItem(
    @Arg("data") data: CreateWorklogItemInput,
    @Arg("where") where: ParentWorklogItemInput,
    @Ctx() { prisma }: Context
  ): boolean {
    const createWorklogItem = prisma.worklogItem.create({
      data: {
        ...data,
        worklog: {
          connect: {
            id: where.worklogId,
          },
        },
      },
    });
    return !!createWorklogItem;
  }
  // TODO: Edit worklog item
  // TODO: Delete worklog item
}
