import { Field, InputType, Int } from "type-graphql";
import { Worklog, WorklogStatus } from "../../schema/Worklog.schema";

@InputType()
export class WorklogUniqueInput implements Partial<Worklog> {
  @Field(() => Int)
  id: number;
}

@InputType()
export class UpdateWorklogStatusInput implements Partial<Worklog> {
  @Field(() => String, { nullable: false })
  reviewedBy!: string;

  @Field(() => String, { nullable: true })
  remark?: string;

  @Field(() => WorklogStatus, { nullable: false })
  status!: "PENDING" | "APPROVED" | "DISAPPROVED";
}
