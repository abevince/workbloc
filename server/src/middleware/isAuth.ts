import { MiddlewareFn } from "type-graphql";

import { Context } from "../context";

const AUTH_MESSAGE =
  "Access denied. You need to be authorized to perform this action.";

export const isAuth: MiddlewareFn<Context> = async (
  { context: { auth, reply, redis } },
  next
) => {
  if (!auth) {
    throw reply.unauthorized(AUTH_MESSAGE);
  }

  if (!auth.isAuthenticated || !auth.user) {
    throw reply.unauthorized(AUTH_MESSAGE);
  }
  if (auth.user.status !== "ACTIVE") {
    reply.clearCookie(process.env.COOKIE_NAME || "sessid");
    redis.del(auth.sessionToken);
    throw reply.forbidden("Suspended account. Logging out now.");
  }

  return next();
};
