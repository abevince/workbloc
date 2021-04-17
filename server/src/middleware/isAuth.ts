import { MiddlewareFn } from "type-graphql";

import { Context } from "../context";

const AUTH_MESSAGE =
  "Access denied. You need to be authorized to perform this action.";

export const isAuth: MiddlewareFn<Context> = async (
  { context: { auth } },
  next
) => {
  if (!auth) {
    throw new Error(AUTH_MESSAGE);
  }

  if (!auth.isAuthenticated || !auth.user) {
    throw new Error(AUTH_MESSAGE);
  }

  return next();
};
