import { Field, ID, ObjectType, registerEnumType } from "type-graphql";
import { Profile } from "./Profile.schema";
import { FieldError } from "./shared/FieldError";

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
  readonly id!: string;

  @Field(() => String)
  email!: string;

  // @Field(() => String)
  password?: string;

  @Field(() => Role, { defaultValue: "USER" })
  role!: "USER" | "ADMIN";

  @Field(() => UserStatus, { defaultValue: "ACTIVE" })
  status!: "ACTIVE" | "DELETED" | "SUSPENDED";

  @Field(() => String, { nullable: true })
  suspensionReason?: string | null;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Profile, { nullable: true })
  profile?: Profile;
}

@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}
