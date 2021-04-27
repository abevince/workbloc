import "reflect-metadata";
import Fastify, { FastifyInstance, FastifyPluginAsync } from "fastify";
import mercurius from "mercurius";
import { buildSchema } from "type-graphql";
import fastifyCors from "fastify-cors";
import sensible from "fastify-sensible";
import cookie, { FastifyCookieOptions } from "fastify-cookie";

import { UserResolver } from "./resolvers/User";
import { ProfileResolver } from "./resolvers/Profile";

import { buildContext } from "./context";
import { WorklogResolver } from "./resolvers/Worklog";
import { WorklogItemResolver } from "./resolvers/WorklogItem";

const server: FastifyInstance = Fastify();

export const app: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.register(fastifyCors, {
    origin: ["http://localhost:3000"],
    credentials: true,
  });
  fastify.register(sensible);
  fastify.register(cookie, {
    secret: process.env.COOKIE_SIGNATURE, // for cookies signature
  } as FastifyCookieOptions);

  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      ProfileResolver,
      WorklogResolver,
      WorklogItemResolver,
    ],
    validate: false,
  });

  fastify.register(mercurius, {
    schema,
    context: buildContext,
    graphiql: true,
  });

  // fastify status/health check
  fastify.get(`/`, async function () {
    return { up: true };
  });
};

server.register(app);
export default server;
export { server };
