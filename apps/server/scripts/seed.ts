import { prisma } from '../src/shared/orm';

async function main() {
  await prisma.user.create({
    data: {
      name: 'admin',
      email: 'admin@example.com',
    },
  });
}

main();
