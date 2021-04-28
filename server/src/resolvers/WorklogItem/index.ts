import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../../context";
import {
  WorklogItem,
  WorklogItemResponse,
} from "../../schema/WorklogItems.schema";
import {
  CreateWorklogItemInput,
  ParentWorklogItemInput,
  WorklogItemUniqueInput,
} from "./inputs";
import { validateCreateWorklogItemInput } from "./validation/worklogItem.validation";

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

  @Mutation(() => WorklogItemResponse)
  async createWorklogItem(
    @Arg("data") data: CreateWorklogItemInput,
    @Arg("where") where: ParentWorklogItemInput,
    @Ctx() { prisma }: Context
  ): Promise<WorklogItemResponse> {
    const validationErrors = validateCreateWorklogItemInput(data);
    if (validationErrors.length > 0) {
      return { errors: validationErrors };
    }
    const createdWorklogItem = await prisma.worklogItem.create({
      data: {
        ...data,
        worklog: {
          connect: {
            id: where.worklogId,
          },
        },
      },
    });
    return { worklogItem: createdWorklogItem };
  }
  // TODO: Edit worklog item

  @Mutation(() => Boolean)
  async deleteWorklogItem(
    @Arg("where") where: WorklogItemUniqueInput,
    @Ctx() { prisma }: Context
  ): Promise<boolean> {
    const deletedWorklogItem = await prisma.worklogItem.delete({
      where: { id: where.id },
    });
    return !!deletedWorklogItem;
  }
}
