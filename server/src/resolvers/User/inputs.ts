import { Field, InputType } from "type-graphql";

import { User } from "../../schema/User.schema";

@InputType()
export class CreateUserInput implements Partial<User> {
  @Field(() => String, { nullable: false })
  email!: string;

  @Field(() => String, { nullable: false })
  password!: string;

  @Field(() => String, { nullable: false })
  firstName!: string;

  @Field(() => String, { nullable: false })
  lastName!: string;
}

@InputType()
export class LoginUserInput implements Partial<User> {
  @Field(() => String, { nullable: false })
  email: string;

  @Field(() => String, { nullable: false })
  password: string;
}

@InputType()
export class CreateAdminInput extends CreateUserInput {
  @Field()
  role!: string;
}

@InputType()
export class UserUniqueInput implements Partial<User> {
  @Field()
  id!: string;
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
