import { Field, InputType, Int } from "type-graphql";
import { WorklogItem } from "../../schema/WorklogItems.schema";

@InputType()
export class WorklogItemUniqueInput implements Partial<WorklogItem> {
  @Field(() => Int, { nullable: false })
  id!: number;
}

@InputType()
export class CreateWorklogItemInput implements Partial<WorklogItem> {
  @Field(() => Date, { nullable: false })
  timeFrom!: Date;

  @Field(() => Date, { nullable: false })
  timeTo!: Date;

  @Field(() => String, { nullable: false })
  workDone!: string;
}

@InputType()
export class ParentWorklogItemInput implements Partial<WorklogItem> {
  @Field(() => Int, { nullable: false })
  worklogId!: number;
}
