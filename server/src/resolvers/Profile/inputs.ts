import { ArgsType, Field, InputType, Int } from "type-graphql";
import { Profile } from "../../schema/Profile.schema";
import { DateTimeFilter } from "../../schema/shared/DateTimeFilter";
import { IntFilter } from "../../schema/shared/IntFilter";
import { SortOrder } from "../../schema/shared/SortOrder";
import { StringFilter } from "../../schema/shared/StringFilter";
import { StringNullableFilter } from "../../schema/shared/StringNullableFilter";

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

@ArgsType()
export class FindManyProfileArgs {
  @Field(() => ProfileWhereInput, {
    nullable: true,
  })
  where?: ProfileWhereInput | undefined;

  @Field(() => [ProfileOrderByInput], {
    nullable: true,
  })
  orderBy?: ProfileOrderByInput[] | undefined;

  @Field(() => ProfileUniqueInput, {
    nullable: true,
  })
  cursor?: ProfileUniqueInput | undefined;

  @Field(() => Int, {
    nullable: true,
  })
  take?: number | undefined;

  @Field(() => Int, {
    nullable: true,
  })
  skip?: number | undefined;
}

@InputType({
  isAbstract: true,
})
export class ProfileOrderByInput {
  @Field(() => SortOrder, {
    nullable: true,
  })
  id?: "asc" | "desc" | undefined;

  @Field(() => SortOrder, {
    nullable: true,
  })
  firstName?: "asc" | "desc" | undefined;

  @Field(() => SortOrder, {
    nullable: true,
  })
  lastName?: "asc" | "desc" | undefined;
}

@InputType({
  isAbstract: true,
})
export class ProfileWhereInput {
  @Field(() => [ProfileWhereInput], {
    nullable: true,
  })
  AND?: ProfileWhereInput[] | undefined;

  @Field(() => [ProfileWhereInput], {
    nullable: true,
  })
  OR?: ProfileWhereInput[] | undefined;

  @Field(() => [ProfileWhereInput], {
    nullable: true,
  })
  NOT?: ProfileWhereInput[] | undefined;

  @Field(() => IntFilter, {
    nullable: true,
  })
  id?: IntFilter | undefined;

  @Field(() => StringFilter, {
    nullable: true,
  })
  firstName?: StringFilter | undefined;

  @Field(() => StringFilter, {
    nullable: true,
  })
  lastName?: StringFilter | undefined;

  @Field(() => StringNullableFilter, {
    nullable: true,
  })
  address?: StringNullableFilter | undefined;

  @Field(() => StringNullableFilter, {
    nullable: true,
  })
  addressCity?: StringNullableFilter | undefined;

  @Field(() => StringNullableFilter, {
    nullable: true,
  })
  addressState?: StringNullableFilter | undefined;

  @Field(() => StringNullableFilter, {
    nullable: true,
  })
  zipCode?: StringNullableFilter | undefined;

  @Field(() => StringNullableFilter, {
    nullable: true,
  })
  phoneNumber?: StringNullableFilter | undefined;

  @Field(() => DateTimeFilter, {
    nullable: true,
  })
  createdAt?: DateTimeFilter | undefined;

  @Field(() => DateTimeFilter, {
    nullable: true,
  })
  updatedAt?: DateTimeFilter | undefined;
}
