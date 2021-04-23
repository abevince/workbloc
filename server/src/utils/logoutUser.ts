import { Redis as IRedis } from "ioredis";
import { FastifyReply } from "fastify";
interface ILogout {
  sessionId: string;
  reply: FastifyReply;
  redis: IRedis;
}
export const logoutUser = ({ sessionId, reply, redis }: ILogout): boolean => {
  reply.clearCookie(process.env.COOKIE_NAME || "sessid");
  redis.del(sessionId);
  return true;
};
