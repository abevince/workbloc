import { Field, ID, ObjectType, registerEnumType } from "type-graphql";

export enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  DELETED = "DELETED",
  SUSPENDED = "SUSPENDED",
}
registerEnumType(UserStatus, {
  name: "UserStatus",
});

registerEnumType(Role, {
  name: "Role",
});

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  email: string;

  // @Field(() => String)
  password?: string;

  @Field(() => Role, { defaultValue: "USER" })
  role: "USER" | "ADMIN";

  @Field(() => UserStatus, { defaultValue: "ACTIVE" })
  status: "ACTIVE" | "DELETED" | "SUSPENDED";

  @Field(() => String, { nullable: true })
  suspensionReason?: string | null;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}

@ObjectType()
export class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}
