import { randomBytes } from "crypto";
import { FastifyRequest } from "fastify";
import { IncomingHttpHeaders } from "http";
import { Redis } from "ioredis";

type Connection = {
  ip: FastifyRequest["ip"];
  userAgent: IncomingHttpHeaders["user-agent"];
};

export type SessionObjectType = {
  userId: string;
  isValid: boolean;
  ip: Connection["ip"];
  userAgent: Connection["userAgent"];
  createdAt: Date;
};

/**
 * Creates and save session to Redis and returns the sessionToken.
 * @param redis Redis client from context.
 * @param userId The id of the user.
 * @param conn Contains the user IP and UserAgent
 * @returns {string} sessionToken
 */

export function createSession(
  redis: Redis,
  userId: string,
  conn: Connection
): string {
  const sessionToken = randomBytes(48).toString("hex");
  const { ip, userAgent } = conn;
  const sessionObject: SessionObjectType = {
    userId,
    isValid: true,
    userAgent,
    ip,
    createdAt: new Date(),
  };

  redis.set(sessionToken, JSON.stringify(sessionObject));

  return sessionToken;
}
