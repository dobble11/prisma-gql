import { StringFilter, schemaBuilder } from '../../shared/schemaBuilder';
import { ContextUserInfo } from '../context';

schemaBuilder.prismaObject('User', {
  fields: (t) => ({
    id: t.exposeID('id'),
    email: t.exposeString('email'),
    name: t.exposeString('name', { nullable: true }),
  }),
});

export type CurrentUserInfo = ContextUserInfo;

schemaBuilder.objectType('CurrentUserInfo', {
  fields: (t) => ({
    id: t.exposeString('id'),
    name: t.exposeString('name', { nullable: true }),
  }),
});

export const UserCreateInput = schemaBuilder.inputType('UserCreateInput', {
  fields: (t) => ({
    email: t.string({ required: true }),
    name: t.string({ required: true }),
  }),
});

export const UserWhereInput = schemaBuilder.prismaWhere('User', {
  name: 'UserWhereInput',
  fields: () => ({
    id: 'String',
    email: 'String',
    name: StringFilter,
  }),
});

export const UserOrderByWithRelationInput = schemaBuilder.prismaOrderBy('User', {
  name: 'UserOrderByWithRelationInput',
  fields: () => ({
    name: true,
    createdAt: true,
    updatedAt: true,
  }),
});
