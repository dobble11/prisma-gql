import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: '../server/src/generated/schema.graphql',
  documents: ['src/graphql/*.graphql'],
  generates: {
    'src/generated/hooks.ts': {
      plugins: [
        {
          add: {
            content: `import { GRAPHQL_ENDPOINT } from '../shared/constants';
import { getReactQueryFetchParams } from '../shared/utils';`,
          },
        },
        'typescript',
        'typescript-operations',
        'typescript-react-query',
      ],
      config: {
        scalars: {
          Date: 'number',
          JSON: '{ [key: string]: any }',
        },
        fetcher: {
          endpoint: 'GRAPHQL_ENDPOINT',
          fetchParams: 'getReactQueryFetchParams()',
        },
      },
    },
  },
};

export default config;
