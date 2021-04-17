import { FastifyReply } from "fastify";

type SetTokenToCookieTypes = {
  sessionToken: string;
  reply: FastifyReply;
};

export const setTokenToCookie = ({
  sessionToken,
  reply,
}: SetTokenToCookieTypes): void => {
  try {
    const now = new Date();
    // Get date, 30 days in the future
    const refreshExpires = now.setDate(now.getDate() + 30);
    reply.setCookie(process.env.COOKIE_NAME || "sessid", sessionToken, {
      path: "/",
      httpOnly: true,
      signed: true,
      maxAge: refreshExpires,
    });
  } catch (error) {
    console.log("Set Token to Cookie", error);
  }
};
