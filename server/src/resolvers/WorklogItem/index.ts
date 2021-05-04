import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../../context";
import {
  WorklogItem,
  WorklogItemResponse,
} from "../../schema/WorklogItems.schema";
import { isToday } from "../../utils/isToday";
import {
  CreateWorklogItemInput,
  ParentWorklogItemInput,
  UpdateWorklogItemInput,
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
    @Ctx() { auth, prisma }: Context
  ): Promise<WorklogItemResponse> {
    const validationErrors = validateCreateWorklogItemInput(data);
    if (validationErrors.length > 0) {
      return { errors: validationErrors };
    }

    const worklog = await prisma.worklog.findFirst({
      where: { userId: auth.user?.id },
      select: { createdAt: true, id: true },
      orderBy: { id: "desc" },
    });

    if (worklog) {
      if (isToday(worklog.createdAt)) {
        const createdWorklogItem = await prisma.worklogItem.create({
          data: {
            ...data,
            worklog: {
              connect: {
                id: worklog.id,
              },
            },
          },
        });
        return { worklogItem: createdWorklogItem };
      }
    }

    const createdWorklogItem = await prisma.worklogItem.create({
      data: {
        ...data,
        worklog: {
          create: {
            user: {
              connect: {
                id: auth.user?.id,
              },
            },
          },
        },
      },
    });
    return { worklogItem: createdWorklogItem };
  }
  // TODO: Edit worklog item
  @Mutation(() => WorklogItem)
  async updateWorklogItem(
    @Arg("data") data: UpdateWorklogItemInput,
    @Arg("where") where: WorklogItemUniqueInput,
    @Ctx() { prisma }: Context
  ): Promise<WorklogItem> {
    const updatedWorklogItem = await prisma.worklogItem.update({
      where,
      data,
    });
    return updatedWorklogItem;
  }

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
