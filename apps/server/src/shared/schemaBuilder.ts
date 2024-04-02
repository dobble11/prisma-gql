import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import PrismaUtils from '@pothos/plugin-prisma-utils';
import type PrismaTypes from '@pothos/plugin-prisma/generated';
import { prisma } from './orm';

export const schemaBuilder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
  Scalars: {
    Date: {
      Input: Date;
      Output: Date;
    };
  };
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
