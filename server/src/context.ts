import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  log: ["query", "info", "warn"],
});

export interface Context {
  prisma: PrismaClient;
}

export const context: Context = {
  prisma: prisma,
};

export const buildContext = async (): Promise<Context> => {
  return {
    prisma: prisma,
  };
};
