import { userEntity } from '../../entities/user';
import { schemaBuilder } from '../../shared/schemaBuilder';
import { UserCreateInput } from './model';

schemaBuilder.mutationFields((t) => ({
  createUser: t.prismaField({
    type: 'User',
    args: {
      data: t.arg({
        type: UserCreateInput,
        required: true,
      }),
    },
    resolve: (query, parent, args, ctx) => {
      return userEntity.createOneUser(ctx.userInfo, args.data);
    },
  }),
  login: t.field({
    skipTypeScopes: true,
    type: 'String',
    args: {
      email: t.arg.string({ required: true }),
    },
    resolve: (parent, args) => userEntity.login(args.email),
  }),
}));
