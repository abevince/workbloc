import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import Redis, { Redis as RedisT } from "ioredis";
import { User } from "./schema/User.schema";
import { SessionObjectType } from "./utils/createSession";

const redis = new Redis({
  port: 6379,
  host: "127.0.0.1",
});

const prisma = new PrismaClient({
  log: ["query", "info", "warn"],
});

interface AuthType {
  sessionToken: string;
  isAuthenticated: boolean;
  user: Partial<User> | null;
}

export interface Context {
  prisma: PrismaClient;
  request: FastifyRequest;
  reply: FastifyReply;
  redis: RedisT;
  auth: AuthType;
}

export const context: Partial<Context> = {
  prisma: prisma,
};

export const buildContext = async (
  req: FastifyRequest,
  reply: FastifyReply
): Promise<Context> => {
  const ctx: Context = {
    prisma: prisma,
    request: req,
    reply: reply,
    redis: redis,
    auth: { sessionToken: "", isAuthenticated: false, user: null },
  };
  try {
    if (!req.cookies[process.env.COOKIE_NAME || "sessid"]) {
      return ctx;
    }

    const { value, valid } = req.unsignCookie(
      req.cookies[process.env.COOKIE_NAME || "sessid"]
    );
    if (!value || !valid) {
      return ctx;
    }

    const session = await redis.get(value);
    if (!session) {
      return ctx;
    }

    const sessionData = JSON.parse(session) as SessionObjectType;
    if (!sessionData.isValid) {
      return ctx;
    }

    const foundUser = await prisma.user.findUnique({
      where: { id: sessionData.userId },
    });

    if (!foundUser) {
      return ctx;
    }

    return {
      ...ctx,
      auth: {
        sessionToken: value,
        isAuthenticated: true,
        user: {
          id: foundUser.id,
          role: foundUser.role,
          status: foundUser.status,
        },
      },
    };
  } catch (error) {
    console.log("Context", error);
    throw Error("Something went wrong");
  }
};
