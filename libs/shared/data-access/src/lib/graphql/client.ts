import { GraphQLClient } from 'graphql-request';

export function createGraphqlClient(token?: string) {
  return new GraphQLClient(
    process.env.NEXT_PUBLIC_GRAPHQL_URL ?? 'http://localhost:3050/graphql',
    {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    },
  );
}
