import { Field, Int, ObjectType } from "type-graphql";
import { FieldError } from "./shared/FieldError";
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

@ObjectType()
export class WorklogItemResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => WorklogItem, { nullable: true })
  worklogItem?: WorklogItem;
}
