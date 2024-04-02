import { prisma } from '../../shared/orm';
import { schemaBuilder } from '../../shared/schemaBuilder';

schemaBuilder.queryFields((t) => ({
  users: t.prismaField({
    type: ['User'],
    resolve: () => {
      return prisma.user.findMany();
    },
  }),
}));
