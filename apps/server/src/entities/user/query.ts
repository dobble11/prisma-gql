import { Prisma, UserStatus } from '@prisma/client';
import { prisma } from '../../shared/orm';
import { ContextUserInfo } from '../../resolvers/context';

export class UserQueryEntity {
  public async queryUsers(
    executor: ContextUserInfo,
    params: {
      where: Prisma.UserWhereInput;
      orderBy?: Prisma.UserOrderByWithRelationInput[];
      skip: number;
      take: number;
    },
  ) {
    const { where, orderBy, skip, take } = params;

    return prisma.user.findMany({
      where: {
        AND: [where, { status: UserStatus.ACTIVE }],
      },
      orderBy,
      skip,
      take,
    });
  }

  public async queryUserCount(executor: ContextUserInfo, where: Prisma.UserWhereInput) {
    return prisma.user.count({
      where: {
        AND: [where, { status: UserStatus.ACTIVE }],
      },
    });
  }
}
