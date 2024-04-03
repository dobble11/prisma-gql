import { userEntity } from '../../entities/user';
import { schemaBuilder } from '../../shared/schemaBuilder';
import { UserOrderByWithRelationInput, UserWhereInput } from './model';

schemaBuilder.queryFields((t) => ({
  currentUserInfo: t.field({
    type: 'CurrentUserInfo',
    resolve: async (root, args, ctx) => ctx.userInfo,
  }),
  users: t.prismaField({
    type: ['User'],
    args: {
      where: t.arg({ type: UserWhereInput }),
      orderBy: t.arg({ type: [UserOrderByWithRelationInput] }),
      take: t.arg({ type: 'Int' }),
      skip: t.arg({ type: 'Int' }),
    },
    resolve: async (query, parent, args, ctx) =>
      userEntity.queryUsers(ctx.userInfo, {
        where: args.where ?? {},
        orderBy: args.orderBy ?? [{ createdAt: 'desc' }, { id: 'desc' }],
        skip: args.skip ?? 0,
        take: args.take ?? 10,
      }),
  }),
}));
