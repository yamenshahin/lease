'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { gql } from '@lease-app/types';
import { createGraphqlClient } from '../../graphql/client';

const createLeaseMutationDocument = gql(`
  mutation CreateLease($clientId: ID!, $input: CreateLeaseInput!) {
    createLease(clientId: $clientId, createLeaseInput: $input) {
      id
      clientId
      unitNumber
      annualRent
      createdAt
    }
  }
`);

export function useCreateLease() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      clientId,
      input,
    }: {
      clientId: string;
      input: Record<string, unknown>;
    }) => {
      const client = createGraphqlClient();
      const data = await client.request(createLeaseMutationDocument, {
        clientId,
        input,
      });
      return data.createLease;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['leases'] });
    },
  });
}
