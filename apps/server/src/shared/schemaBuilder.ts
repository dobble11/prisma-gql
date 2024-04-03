import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import PrismaUtils from '@pothos/plugin-prisma-utils';
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import { prisma } from './orm';
import { MyContext } from '../resolvers/context';
import { CurrentUserInfo } from '../resolvers/user/model';

type CustomizedSchemaObjectType = {
  CurrentUserInfo: CurrentUserInfo;
};

export const schemaBuilder = new SchemaBuilder<{
  Context: MyContext;
  PrismaTypes: PrismaTypes;
  Scalars: {
    Date: {
      Input: Date;
      Output: Date;
    };
  };
  Objects: CustomizedSchemaObjectType;
}>({
  plugins: [PrismaPlugin, PrismaUtils],
  prisma: {
    client: prisma,
    filterConnectionTotalCount: true,
  },
});

schemaBuilder.scalarType('Date', {
  serialize(value) {
    if (value instanceof Date) {
      return value.getTime();
    }
    throw Error('GraphQL Date Scalar serializer expected a `Date` object');
  },
  parseValue(value) {
    if (typeof value === 'number') {
      return new Date(value);
    }
    throw new Error('GraphQL Date Scalar parser expected a `number`');
  },
});

export const DateTimeFilter = schemaBuilder.prismaFilter('Date', {
  name: 'DateTimeFilter',
  ops: ['equals', 'in', 'notIn', 'not', 'is', 'isNot', 'lt', 'lte', 'gt', 'gte'],
});

export const StringFilter = schemaBuilder.prismaFilter('String', {
  name: 'StringFilter',
  ops: [
    'equals',
    'in',
    'notIn',
    'not',
    'is',
    'isNot',
    'contains',
    'startsWith',
    'endsWith',
    'lt',
    'lte',
    'gt',
    'gte',
  ],
});

export const IntFilter = schemaBuilder.prismaFilter('Int', {
  name: 'IntFilter',
  ops: ['equals', 'in', 'notIn', 'not', 'is', 'isNot', 'lt', 'lte', 'gt', 'gte'],
});

export const BooleanFilter = schemaBuilder.prismaFilter('Boolean', {
  name: 'BooleanFilter',
  ops: ['equals', 'in', 'notIn', 'not', 'is', 'isNot'],
});
