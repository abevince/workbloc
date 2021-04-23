import { Field, ID, ObjectType } from "type-graphql";
import { User } from "./User.schema";

@ObjectType()
export class Profile {
  @Field(() => ID)
  readonly id: number;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String, { nullable: true })
  address?: string | null;

  @Field(() => String, { nullable: true })
  addressCity?: string | null;

  @Field(() => String, { nullable: true })
  addressState?: string | null;

  @Field(() => String, { nullable: true })
  zipCode?: string | null;

  @Field(() => String, { nullable: true })
  phoneNumber?: string | null;

  @Field(() => User)
  user?: User;

  @Field(() => String, { nullable: false })
  userId!: string;

  @Field(() => Date)
  createdAt!: Date;

  @Field(() => Date)
  updatedAt!: Date;
}
