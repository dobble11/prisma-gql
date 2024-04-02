import { writeFileSync } from 'fs';
import { lexicographicSortSchema, printSchema } from 'graphql';
import path from 'path';
import { isProduction } from './shared/constants';
import { schemaBuilder } from './shared/schemaBuilder';
import './resolvers';

schemaBuilder.queryType();
schemaBuilder.mutationType();

export const schema = schemaBuilder.toSchema();

if (!isProduction) {
  const schemaAsString = printSchema(lexicographicSortSchema(schema));
  writeFileSync(
    path.resolve(__dirname, './generated/schema.graphql'),
    '# The following content is automatically generated by the server, please do not modify it manually.\n\n' +
      schemaAsString,
  );
}
