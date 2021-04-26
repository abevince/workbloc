import { Field, InputType, Int, ObjectType } from "type-graphql";
import { Worklog } from "./Worklog.schema";

@ObjectType()
export class WorklogItem {
  @Field(() => Int, { nullable: false })
  readonly id!: number;

  @Field(() => Worklog)
  worklog?: Worklog;

  @Field(() => Int, { nullable: false })
  worklogId!: number;

  @Field(() => Date, { nullable: false })
  timeFrom!: Date;

  @Field(() => Date, { nullable: false })
  timeTo!: Date;

  @Field(() => String, { nullable: false })
  workDone!: string;
}

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
