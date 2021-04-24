import { Field, InputType, Int } from "type-graphql";
import { Worklog } from "../../schema/Worklog.schema";

@InputType()
export class WorklogUniqueInput implements Partial<Worklog> {
  @Field(() => Int)
  id: number;
}
