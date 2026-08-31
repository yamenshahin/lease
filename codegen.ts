import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'apps/api/src/schema.gql',
  documents: [
    'apps/client/**/*.{ts,tsx}',
    'apps/admin/**/*.{ts,tsx}',
    'libs/shared/data-access/**/*.{ts,tsx}',
  ],
  ignoreNoDocuments: true,
  generates: {
    'libs/shared/types/src/generated/': {
      preset: 'client',
      presetConfig: {
        gqlTagName: 'gql',
        fragmentMasking: false,
      },
      config: {
        scalars: {
          DateTime: 'string',
        },
      },
    },
  },
};

export default config;
