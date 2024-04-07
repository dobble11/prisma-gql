import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { LogKey, logger } from '../shared/logger';
import { prisma } from '../shared/orm';
import { GraphQLError } from 'graphql';
import { fa } from '../shared/utils';
import { userEntity } from '../entities/user';

export interface ContextUserInfo extends User {}

export interface MyContext {
  userInfo: ContextUserInfo;
}

export const createContext = async ({
  req,
}: {
  req: Request;
  res: Response;
}): Promise<Partial<MyContext>> => {
  const token = req.headers.authorization;
  if (!token) {
    return {};
  }

  const { result, err } = await fa(userEntity.verifyToken(token));
  if (err) {
    throw new GraphQLError(LogKey.UNAUTHENTICATED);
  }

  const user = await prisma.user.findUnique({
    where: {
      id: result.userId,
    },
  });

  if (!user) {
    logger.error({ key: LogKey.NOT_FOUND_USER, token, userid: result.userId });
    throw new GraphQLError(LogKey.UNAUTHENTICATED);
  }

  return { userInfo: user };
};
