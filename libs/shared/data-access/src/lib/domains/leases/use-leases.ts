'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { gql } from '@lease-app/types';
import { createGraphqlClient } from '../../graphql/client';

const leasesQueryDocument = gql(`
  query Leases {
    leases {
      id
      clientId
      ownerMobile
      ownerId
      deedNumber
      unitNumber
      unitType
      annualRent
      contractStartDate
      contractDuration
      paymentFrequency
      tenantType
      createdAt
    }
  }
`);

const leaseQueryDocument = gql(`
  query Lease($id: ID!) {
    lease(id: $id) {
      id
      clientId
      applicantType
      ownerMobile
      ownerId
      deedNumber
      deedDate
      location {
        lat
        lng
        address
      }
      tenantType
      tenantIdNumber
      tenantDob
      tenantMobile
      unifiedNumber
      representativeId
      agencyNumber
      contractStartDate
      contractDuration
      paymentFrequency
      annualRent
      feePayer
      unitType
      unitNumber
      floor
      areaSqMeters
      bedrooms
      bathrooms
      kitchen {
        exists
        count
      }
      livingRoom {
        exists
        count
      }
      receptionRoom {
        exists
        count
      }
      splitAc {
        exists
        count
      }
      windowAc {
        exists
        count
      }
      storageRoom
      maidRoom
      electricityMeter
      waterMeter
      createdAt
      updatedAt
    }
  }
`);

const leasesByClientQueryDocument = gql(`
  query LeasesByClient($clientId: ID!) {
    leasesByClient(clientId: $clientId) {
      id
      unitNumber
      unitType
      annualRent
      contractStartDate
      ownerMobile
      createdAt
    }
  }
`);

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

export function useLeases() {
  return useQuery({
    queryKey: ['leases'],
    queryFn: async () => {
      const client = createGraphqlClient();
      const data = await client.request(leasesQueryDocument);
      return data.leases;
    },
  });
}

export function useLease(id: string | undefined) {
  return useQuery({
    queryKey: ['lease', id],
    enabled: !!id,
    queryFn: async () => {
      const client = createGraphqlClient();
      const data = await client.request(leaseQueryDocument, { id: id! });
      return data.lease;
    },
  });
}

export function useLeasesByClient(clientId: string | undefined) {
  return useQuery({
    queryKey: ['leases', 'byClient', clientId],
    enabled: !!clientId,
    queryFn: async () => {
      const client = createGraphqlClient();
      const data = await client.request(leasesByClientQueryDocument, {
        clientId: clientId!,
      });
      return data.leasesByClient;
    },
  });
}

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
