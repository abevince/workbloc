import { registerEnumType } from "type-graphql";

export enum SortOrder {
  asc = "asc",
  desc = "desc",
}
registerEnumType(SortOrder, {
  name: "SortOrder",
});
