import { prisma } from '../../shared/orm';
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
    resolve: (query, parent, args) => {
      return prisma.user.create({
        data: args.data,
      });
    },
  }),
}));
