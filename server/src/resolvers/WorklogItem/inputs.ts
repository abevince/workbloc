import { Field, InputType, Int } from "type-graphql";
import { WorklogItem } from "../../schema/WorklogItems.schema";

@InputType()
export class WorklogItemUniqueInput implements Partial<WorklogItem> {
  @Field(() => Int, { nullable: false })
  id!: number;
}

@InputType()
export class CreateWorklogItemInput implements Partial<WorklogItem> {
  @Field(() => String, { nullable: false })
  timeFrom!: string;

  @Field(() => String, { nullable: false })
  timeTo!: string;

  @Field(() => String, { nullable: false })
  workDone!: string;
}

@InputType()
export class UpdateWorklogItemInput implements Partial<WorklogItem> {
  @Field(() => String, { nullable: true })
  timeFrom?: string;

  @Field(() => String, { nullable: true })
  timeTo?: string;

  @Field(() => String, { nullable: true })
  workDone?: string;
}

@InputType()
export class ParentWorklogItemInput implements Partial<WorklogItem> {
  @Field(() => Int, { nullable: false })
  worklogId!: number;
}
