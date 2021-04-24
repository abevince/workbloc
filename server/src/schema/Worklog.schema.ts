import { Field, Int, ObjectType, registerEnumType } from "type-graphql";
import { User } from "./User.schema";
import { WorklogItem } from "./WorklogItems.schema";

export enum WorklogStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  DISAPPROVED = "DISAPPROVED",
}

registerEnumType(WorklogStatus, {
  name: "WorklogStatus",
});

@ObjectType()
export class Worklog {
  @Field(() => Int)
  readonly id!: number;

  @Field(() => User)
  user?: User;

  @Field(() => String, { nullable: false })
  userId!: string;

  @Field(() => WorklogStatus, { defaultValue: "PENDING" })
  status!: "PENDING" | "APPROVED" | "DISAPPROVED";

  @Field(() => String, { nullable: true })
  reviewedBy?: string | null;

  @Field(() => String, { nullable: true })
  remark?: string | null;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;

  @Field(() => WorklogItem, { nullable: true })
  WorklogItem?: WorklogItem[];
}
