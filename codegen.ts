import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: '../ecspedia_backend/src/main/resources/graphql/schema.graphqls',
  documents: 'src/**/*.{queries,mutations}.ts',
  generates: {
    'src/types/': {
      preset: 'client',
      config: {
        documentMode: 'string',
      },
    },
  },
};

export default config;
