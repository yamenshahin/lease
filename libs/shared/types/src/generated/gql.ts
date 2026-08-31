/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query Clients {\n    clients {\n      id\n      whatsappNumber\n      isVerified\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.ClientsDocument,
    "\n  query Client($id: ID!) {\n    client(id: $id) {\n      id\n      whatsappNumber\n      isVerified\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.ClientDocument,
    "\n  mutation CreateClient($input: CreateClientInput!) {\n    createClient(createClientInput: $input) {\n      id\n      whatsappNumber\n      isVerified\n      createdAt\n    }\n  }\n": typeof types.CreateClientDocument,
    "\n  query Leases {\n    leases {\n      id\n      clientId\n      ownerMobile\n      ownerId\n      deedNumber\n      unitNumber\n      unitType\n      annualRent\n      contractStartDate\n      contractDuration\n      paymentFrequency\n      tenantType\n      createdAt\n    }\n  }\n": typeof types.LeasesDocument,
    "\n  query Lease($id: ID!) {\n    lease(id: $id) {\n      id\n      clientId\n      applicantType\n      ownerMobile\n      ownerId\n      deedNumber\n      deedDate\n      location {\n        lat\n        lng\n        address\n      }\n      tenantType\n      tenantIdNumber\n      tenantDob\n      tenantMobile\n      unifiedNumber\n      representativeId\n      agencyNumber\n      contractStartDate\n      contractDuration\n      paymentFrequency\n      annualRent\n      feePayer\n      unitType\n      unitNumber\n      floor\n      areaSqMeters\n      bedrooms\n      bathrooms\n      kitchen {\n        exists\n        count\n      }\n      livingRoom {\n        exists\n        count\n      }\n      receptionRoom {\n        exists\n        count\n      }\n      splitAc {\n        exists\n        count\n      }\n      windowAc {\n        exists\n        count\n      }\n      storageRoom\n      maidRoom\n      electricityMeter\n      waterMeter\n      createdAt\n      updatedAt\n    }\n  }\n": typeof types.LeaseDocument,
    "\n  query LeasesByClient($clientId: ID!) {\n    leasesByClient(clientId: $clientId) {\n      id\n      unitNumber\n      unitType\n      annualRent\n      contractStartDate\n      ownerMobile\n      createdAt\n    }\n  }\n": typeof types.LeasesByClientDocument,
    "\n  mutation CreateLease($clientId: ID!, $input: CreateLeaseInput!) {\n    createLease(clientId: $clientId, createLeaseInput: $input) {\n      id\n      clientId\n      unitNumber\n      annualRent\n      createdAt\n    }\n  }\n": typeof types.CreateLeaseDocument,
};
const documents: Documents = {
    "\n  query Clients {\n    clients {\n      id\n      whatsappNumber\n      isVerified\n      createdAt\n      updatedAt\n    }\n  }\n": types.ClientsDocument,
    "\n  query Client($id: ID!) {\n    client(id: $id) {\n      id\n      whatsappNumber\n      isVerified\n      createdAt\n      updatedAt\n    }\n  }\n": types.ClientDocument,
    "\n  mutation CreateClient($input: CreateClientInput!) {\n    createClient(createClientInput: $input) {\n      id\n      whatsappNumber\n      isVerified\n      createdAt\n    }\n  }\n": types.CreateClientDocument,
    "\n  query Leases {\n    leases {\n      id\n      clientId\n      ownerMobile\n      ownerId\n      deedNumber\n      unitNumber\n      unitType\n      annualRent\n      contractStartDate\n      contractDuration\n      paymentFrequency\n      tenantType\n      createdAt\n    }\n  }\n": types.LeasesDocument,
    "\n  query Lease($id: ID!) {\n    lease(id: $id) {\n      id\n      clientId\n      applicantType\n      ownerMobile\n      ownerId\n      deedNumber\n      deedDate\n      location {\n        lat\n        lng\n        address\n      }\n      tenantType\n      tenantIdNumber\n      tenantDob\n      tenantMobile\n      unifiedNumber\n      representativeId\n      agencyNumber\n      contractStartDate\n      contractDuration\n      paymentFrequency\n      annualRent\n      feePayer\n      unitType\n      unitNumber\n      floor\n      areaSqMeters\n      bedrooms\n      bathrooms\n      kitchen {\n        exists\n        count\n      }\n      livingRoom {\n        exists\n        count\n      }\n      receptionRoom {\n        exists\n        count\n      }\n      splitAc {\n        exists\n        count\n      }\n      windowAc {\n        exists\n        count\n      }\n      storageRoom\n      maidRoom\n      electricityMeter\n      waterMeter\n      createdAt\n      updatedAt\n    }\n  }\n": types.LeaseDocument,
    "\n  query LeasesByClient($clientId: ID!) {\n    leasesByClient(clientId: $clientId) {\n      id\n      unitNumber\n      unitType\n      annualRent\n      contractStartDate\n      ownerMobile\n      createdAt\n    }\n  }\n": types.LeasesByClientDocument,
    "\n  mutation CreateLease($clientId: ID!, $input: CreateLeaseInput!) {\n    createLease(clientId: $clientId, createLeaseInput: $input) {\n      id\n      clientId\n      unitNumber\n      annualRent\n      createdAt\n    }\n  }\n": types.CreateLeaseDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Clients {\n    clients {\n      id\n      whatsappNumber\n      isVerified\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query Clients {\n    clients {\n      id\n      whatsappNumber\n      isVerified\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Client($id: ID!) {\n    client(id: $id) {\n      id\n      whatsappNumber\n      isVerified\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query Client($id: ID!) {\n    client(id: $id) {\n      id\n      whatsappNumber\n      isVerified\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateClient($input: CreateClientInput!) {\n    createClient(createClientInput: $input) {\n      id\n      whatsappNumber\n      isVerified\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateClient($input: CreateClientInput!) {\n    createClient(createClientInput: $input) {\n      id\n      whatsappNumber\n      isVerified\n      createdAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Leases {\n    leases {\n      id\n      clientId\n      ownerMobile\n      ownerId\n      deedNumber\n      unitNumber\n      unitType\n      annualRent\n      contractStartDate\n      contractDuration\n      paymentFrequency\n      tenantType\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query Leases {\n    leases {\n      id\n      clientId\n      ownerMobile\n      ownerId\n      deedNumber\n      unitNumber\n      unitType\n      annualRent\n      contractStartDate\n      contractDuration\n      paymentFrequency\n      tenantType\n      createdAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Lease($id: ID!) {\n    lease(id: $id) {\n      id\n      clientId\n      applicantType\n      ownerMobile\n      ownerId\n      deedNumber\n      deedDate\n      location {\n        lat\n        lng\n        address\n      }\n      tenantType\n      tenantIdNumber\n      tenantDob\n      tenantMobile\n      unifiedNumber\n      representativeId\n      agencyNumber\n      contractStartDate\n      contractDuration\n      paymentFrequency\n      annualRent\n      feePayer\n      unitType\n      unitNumber\n      floor\n      areaSqMeters\n      bedrooms\n      bathrooms\n      kitchen {\n        exists\n        count\n      }\n      livingRoom {\n        exists\n        count\n      }\n      receptionRoom {\n        exists\n        count\n      }\n      splitAc {\n        exists\n        count\n      }\n      windowAc {\n        exists\n        count\n      }\n      storageRoom\n      maidRoom\n      electricityMeter\n      waterMeter\n      createdAt\n      updatedAt\n    }\n  }\n"): (typeof documents)["\n  query Lease($id: ID!) {\n    lease(id: $id) {\n      id\n      clientId\n      applicantType\n      ownerMobile\n      ownerId\n      deedNumber\n      deedDate\n      location {\n        lat\n        lng\n        address\n      }\n      tenantType\n      tenantIdNumber\n      tenantDob\n      tenantMobile\n      unifiedNumber\n      representativeId\n      agencyNumber\n      contractStartDate\n      contractDuration\n      paymentFrequency\n      annualRent\n      feePayer\n      unitType\n      unitNumber\n      floor\n      areaSqMeters\n      bedrooms\n      bathrooms\n      kitchen {\n        exists\n        count\n      }\n      livingRoom {\n        exists\n        count\n      }\n      receptionRoom {\n        exists\n        count\n      }\n      splitAc {\n        exists\n        count\n      }\n      windowAc {\n        exists\n        count\n      }\n      storageRoom\n      maidRoom\n      electricityMeter\n      waterMeter\n      createdAt\n      updatedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query LeasesByClient($clientId: ID!) {\n    leasesByClient(clientId: $clientId) {\n      id\n      unitNumber\n      unitType\n      annualRent\n      contractStartDate\n      ownerMobile\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query LeasesByClient($clientId: ID!) {\n    leasesByClient(clientId: $clientId) {\n      id\n      unitNumber\n      unitType\n      annualRent\n      contractStartDate\n      ownerMobile\n      createdAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateLease($clientId: ID!, $input: CreateLeaseInput!) {\n    createLease(clientId: $clientId, createLeaseInput: $input) {\n      id\n      clientId\n      unitNumber\n      annualRent\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateLease($clientId: ID!, $input: CreateLeaseInput!) {\n    createLease(clientId: $clientId, createLeaseInput: $input) {\n      id\n      clientId\n      unitNumber\n      annualRent\n      createdAt\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;