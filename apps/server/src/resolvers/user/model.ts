import { schemaBuilder } from '../../shared/schemaBuilder';

schemaBuilder.prismaObject('User', {
  fields: (t) => ({
    id: t.exposeID('id'),
    email: t.exposeString('email'),
    name: t.exposeString('name', { nullable: true }),
  }),
});

export const UserCreateInput = schemaBuilder.inputType('UserCreateInput', {
  fields: (t) => ({
    email: t.string({ required: true }),
    name: t.string({ required: true }),
  }),
});
