import argon2 from "argon2";
import { PrismaClient } from "@prisma/client";

import { User } from "../schema/User.schema";

type TData = {
  email: string;
  password: string;
};

type AuthorizeUserRT = {
  isAuthorized: boolean;
  user: User | null;
};
/**
 * Check and verifies user credentials from the database
 * @param prisma Prisma client
 * @param data User credentials from client form
 * @param data.email The email of the user.
 * @param data.password The password of the user.
 * @returns {isAuthorized: boolean, user: object }
 */

export const authorizeUser = async (
  prisma: PrismaClient,
  data: TData
): Promise<AuthorizeUserRT> => {
  try {
    const foundUser = await prisma.user.findFirst({
      where: { email: data.email },
    });
    if (!foundUser) {
      return { isAuthorized: false, user: null };
    }
    const valid = await argon2.verify(foundUser.password, data.password);
    if (!valid) {
      return { isAuthorized: false, user: null };
    }

    return { isAuthorized: true, user: foundUser };
  } catch (error) {
    console.log(error);
    return { isAuthorized: false, user: null };
  }
};
