import { Field, InputType } from "type-graphql";

import { User } from "../../schema/User.schema";

@InputType()
export class UserInput implements Partial<User> {
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class CreateAdminInput extends UserInput {
  @Field()
  role: string;
}

@InputType()
export class UserUniqueInput implements Partial<User> {
  @Field()
  id: string;
}

@InputType()
export class ChangePasswordInput {
  @Field()
  currentPassword: string;

  @Field()
  newPassword: string;
}

@InputType()
export class ChangeUserStatusInput {
  @Field()
  status: "ACTIVE" | "DELETED" | "SUSPENDED";

  @Field()
  reason: string;
}
