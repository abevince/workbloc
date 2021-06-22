import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch("http://localhost:4001/graphql", {
      method: "POST",
      credentials: "include",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ query, variables }),
    });
    
    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type CreateProfileInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  address?: Maybe<Scalars['String']>;
  addressCity?: Maybe<Scalars['String']>;
  addressState?: Maybe<Scalars['String']>;
  zipCode?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
};

export type CreateUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type CreateWorklogItemInput = {
  timeFrom: Scalars['String'];
  timeTo: Scalars['String'];
  workDone: Scalars['String'];
};


export type DateTimeFilter = {
  equals?: Maybe<Scalars['DateTime']>;
  in?: Maybe<Array<Scalars['DateTime']>>;
  notIn?: Maybe<Array<Scalars['DateTime']>>;
  lt?: Maybe<Scalars['DateTime']>;
  lte?: Maybe<Scalars['DateTime']>;
  gt?: Maybe<Scalars['DateTime']>;
  gte?: Maybe<Scalars['DateTime']>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type IntFilter = {
  equals?: Maybe<Scalars['Int']>;
  in?: Maybe<Array<Scalars['Int']>>;
  notIn?: Maybe<Array<Scalars['Int']>>;
  lt?: Maybe<Scalars['Int']>;
  lte?: Maybe<Scalars['Int']>;
  gt?: Maybe<Scalars['Int']>;
  gte?: Maybe<Scalars['Int']>;
};

export type LoginUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  createUserProfile: Scalars['Boolean'];
  updateUserProfile: Scalars['Boolean'];
  createWorklog: Scalars['Boolean'];
  updateWorklogStatus: Scalars['Boolean'];
  createWorklogItem: WorklogItemResponse;
  updateWorklogItem: WorklogItem;
  deleteWorklogItem: Scalars['Boolean'];
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationLoginArgs = {
  data: LoginUserInput;
};


export type MutationCreateUserProfileArgs = {
  data: CreateProfileInput;
};


export type MutationUpdateUserProfileArgs = {
  args: UpdateProfileInput;
};


export type MutationUpdateWorklogStatusArgs = {
  data: UpdateWorklogStatusInput;
  where: WorklogUniqueInput;
};


export type MutationCreateWorklogItemArgs = {
  data: CreateWorklogItemInput;
};


export type MutationUpdateWorklogItemArgs = {
  where: WorklogItemUniqueInput;
  data: UpdateWorklogItemInput;
};


export type MutationDeleteWorklogItemArgs = {
  where: WorklogItemUniqueInput;
};

export type ParentWorklogItemInput = {
  worklogId: Scalars['Int'];
};

export type Profile = {
  __typename?: 'Profile';
  id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  address?: Maybe<Scalars['String']>;
  addressCity?: Maybe<Scalars['String']>;
  addressState?: Maybe<Scalars['String']>;
  zipCode?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  user: User;
  userId: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type ProfileOrderByInput = {
  id?: Maybe<SortOrder>;
  firstName?: Maybe<SortOrder>;
  lastName?: Maybe<SortOrder>;
};

export type ProfileUniqueInput = {
  id: Scalars['Int'];
};

export type ProfileWhereInput = {
  AND?: Maybe<Array<ProfileWhereInput>>;
  OR?: Maybe<Array<ProfileWhereInput>>;
  NOT?: Maybe<Array<ProfileWhereInput>>;
  id?: Maybe<IntFilter>;
  firstName?: Maybe<StringFilter>;
  lastName?: Maybe<StringFilter>;
  address?: Maybe<StringNullableFilter>;
  addressCity?: Maybe<StringNullableFilter>;
  addressState?: Maybe<StringNullableFilter>;
  zipCode?: Maybe<StringNullableFilter>;
  phoneNumber?: Maybe<StringNullableFilter>;
  createdAt?: Maybe<DateTimeFilter>;
  updatedAt?: Maybe<DateTimeFilter>;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  isLoggedIn: Scalars['Boolean'];
  me: UserResponse;
  users: Array<User>;
  user?: Maybe<User>;
  helloProfile: Scalars['String'];
  userProfile?: Maybe<Profile>;
  profiles: Array<Profile>;
  worklog?: Maybe<Worklog>;
  worklogs: Array<Worklog>;
  worklogItem?: Maybe<WorklogItem>;
  worklogItems?: Maybe<Array<WorklogItem>>;
};


export type QueryUserArgs = {
  where: UserUniqueInput;
};


export type QueryProfilesArgs = {
  where?: Maybe<ProfileWhereInput>;
  orderBy?: Maybe<Array<ProfileOrderByInput>>;
  cursor?: Maybe<ProfileUniqueInput>;
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryWorklogArgs = {
  where: WorklogUniqueInput;
};


export type QueryWorklogItemArgs = {
  where: WorklogItemUniqueInput;
};


export type QueryWorklogItemsArgs = {
  where: ParentWorklogItemInput;
};

export enum Role {
  User = 'USER',
  Admin = 'ADMIN'
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type StringFilter = {
  equals?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  notIn?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
};

export type StringNullableFilter = {
  equals?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  notIn?: Maybe<Array<Scalars['String']>>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  startsWith?: Maybe<Scalars['String']>;
  endsWith?: Maybe<Scalars['String']>;
};

export type UpdateProfileInput = {
  data: CreateProfileInput;
  where: ProfileUniqueInput;
};

export type UpdateWorklogItemInput = {
  timeFrom?: Maybe<Scalars['String']>;
  timeTo?: Maybe<Scalars['String']>;
  workDone?: Maybe<Scalars['String']>;
};

export type UpdateWorklogStatusInput = {
  reviewedBy: Scalars['String'];
  remark?: Maybe<Scalars['String']>;
  status: WorklogStatus;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  role?: Maybe<Role>;
  status?: Maybe<UserStatus>;
  suspensionReason?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  profile?: Maybe<Profile>;
  worklog?: Maybe<Array<Worklog>>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export enum UserStatus {
  Active = 'ACTIVE',
  Deleted = 'DELETED',
  Suspended = 'SUSPENDED'
}

export type UserUniqueInput = {
  id: Scalars['String'];
};

export type Worklog = {
  __typename?: 'Worklog';
  id: Scalars['Int'];
  user: User;
  userId: Scalars['String'];
  status?: Maybe<WorklogStatus>;
  reviewedBy?: Maybe<Scalars['String']>;
  remark?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  worklogItem?: Maybe<Array<WorklogItem>>;
};

export type WorklogItem = {
  __typename?: 'WorklogItem';
  id: Scalars['Int'];
  worklog: Worklog;
  worklogId: Scalars['Int'];
  timeFrom: Scalars['String'];
  timeTo: Scalars['String'];
  workDone: Scalars['String'];
};

export type WorklogItemResponse = {
  __typename?: 'WorklogItemResponse';
  errors?: Maybe<Array<FieldError>>;
  worklogItem?: Maybe<WorklogItem>;
};

export type WorklogItemUniqueInput = {
  id: Scalars['Int'];
};

export enum WorklogStatus {
  Pending = 'PENDING',
  Approved = 'APPROVED',
  Disapproved = 'DISAPPROVED'
}

export type WorklogUniqueInput = {
  id: Scalars['Int'];
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'status' | 'role'>
    )> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'status' | 'role'>
    )> }
  ) }
);

export type SignUpMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignUpMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email'>
    )> }
  ) }
);


export const LoginDocument = `
    mutation Login($email: String!, $password: String!) {
  login(data: {email: $email, password: $password}) {
    errors {
      field
      message
    }
    user {
      id
      email
      status
      role
    }
  }
}
    `;
export const useLoginMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<LoginMutation, TError, LoginMutationVariables, TContext>) => 
    useMutation<LoginMutation, TError, LoginMutationVariables, TContext>(
      (variables?: LoginMutationVariables) => fetcher<LoginMutation, LoginMutationVariables>(LoginDocument, variables)(),
      options
    );
export const MeDocument = `
    query Me {
  me {
    errors {
      field
      message
    }
    user {
      id
      email
      status
      role
    }
  }
}
    `;
export const useMeQuery = <
      TData = MeQuery,
      TError = unknown
    >(
      variables?: MeQueryVariables, 
      options?: UseQueryOptions<MeQuery, TError, TData>
    ) => 
    useQuery<MeQuery, TError, TData>(
      ['Me', variables],
      fetcher<MeQuery, MeQueryVariables>(MeDocument, variables),
      options
    );
export const SignUpDocument = `
    mutation SignUp($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
  createUser(
    data: {firstName: $firstName, lastName: $lastName, email: $email, password: $password}
  ) {
    errors {
      field
      message
    }
    user {
      id
      email
    }
  }
}
    `;
export const useSignUpMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<SignUpMutation, TError, SignUpMutationVariables, TContext>) => 
    useMutation<SignUpMutation, TError, SignUpMutationVariables, TContext>(
      (variables?: SignUpMutationVariables) => fetcher<SignUpMutation, SignUpMutationVariables>(SignUpDocument, variables)(),
      options
    );