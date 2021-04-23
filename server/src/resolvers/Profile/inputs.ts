import { Field, InputType, Int } from "type-graphql";
import { Profile } from "../../schema/Profile.schema";

@InputType()
export class CreateProfileInput implements Partial<Profile> {
  @Field()
  firstName!: string;

  @Field()
  lastName!: string;

  @Field(() => String, { nullable: true })
  address?: string | undefined;

  @Field(() => String, { nullable: true })
  addressCity?: string | undefined;

  @Field(() => String, { nullable: true })
  addressState?: string | undefined;

  @Field(() => String, { nullable: true })
  zipCode?: string | undefined;

  @Field(() => String, { nullable: true })
  phoneNumber?: string | undefined;
}
@InputType()
export class ProfileUniqueInput {
  @Field(() => Int)
  id: number;
}

@InputType()
export class UpdateProfileInput {
  @Field()
  data!: CreateProfileInput;

  @Field(() => ProfileUniqueInput, { nullable: false })
  where!: ProfileUniqueInput;
}
