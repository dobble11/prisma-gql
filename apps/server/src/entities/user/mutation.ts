import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_VALID_DAY_COUNT } from '../../shared/constants';
import { ContextUserInfo } from '../../resolvers/context';
import { UserCreateInput } from '../../resolvers/user/model';
import { prisma } from '../../shared/orm';

export class UserMutationEntity {
  public async signToken(userId: string) {
    return jwt.sign({ userId }, JWT_SECRET, {
      expiresIn: 60 * 60 * 24 * JWT_VALID_DAY_COUNT,
    });
  }

  public async verifyToken(token: string) {
    return jwt.verify(token.replace('Bearer ', ''), JWT_SECRET) as {
      userId: string;
    };
  }

  public async createOneUser(executor: ContextUserInfo, data: typeof UserCreateInput.$inferInput) {
    return prisma.user.create({
      data,
    });
  }
}
