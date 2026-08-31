'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { gql } from '@lease-app/types';
import { createGraphqlClient } from '../../graphql/client';

const clientsQueryDocument = gql(`
  query Clients {
    clients {
      id
      whatsappNumber
      isVerified
      createdAt
    }
  }
`);

const createClientMutationDocument = gql(`
  mutation CreateClient($input: CreateClientInput!) {
    createClient(createClientInput: $input) {
      id
      whatsappNumber
      isVerified
      createdAt
    }
  }
`);

export function useClients() {
  return useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const client = createGraphqlClient();
      const data = await client.request(clientsQueryDocument);
      return data.clients;
    },
  });
}

export function useCreateClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (whatsappNumber: string) => {
      const client = createGraphqlClient();
      const data = await client.request(createClientMutationDocument, {
        input: { whatsappNumber },
      });
      return data.createClient;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
    },
  });
}
