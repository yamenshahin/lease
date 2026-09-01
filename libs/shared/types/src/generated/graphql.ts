/* eslint-disable */
/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type ApplicantType =
  | 'OWNER_OR_REP'
  | 'TENANT';

export type ContractDuration =
  | 'ONE_YEAR'
  | 'SIX_MONTHS'
  | 'THREE_MONTHS'
  | 'TWO_YEARS';

export type CreateClientInput = {
  whatsappNumber: string;
};

export type CreateLeaseInput = {
  agencyNumber?: string | null | undefined;
  annualRent: number;
  applicantType: ApplicantType;
  areaSqMeters: number;
  bathrooms: number;
  bedrooms: number;
  contractDuration: ContractDuration;
  contractStartDate: string;
  deedDate: string;
  deedNumber: string;
  electricityMeter: string;
  feePayer: FeePayer;
  floor: FloorLevel;
  kitchen?: UnitFeatureInput | null | undefined;
  leaseType: LeaseType;
  livingRoom?: UnitFeatureInput | null | undefined;
  location?: MapLocationInput | null | undefined;
  maidRoom?: boolean;
  ownerId: string;
  ownerMobile: string;
  paymentFrequency: PaymentFrequency;
  receptionRoom?: UnitFeatureInput | null | undefined;
  representativeId?: string | null | undefined;
  splitAc?: UnitFeatureInput | null | undefined;
  storageRoom?: boolean;
  tenantDob?: string | null | undefined;
  tenantIdNumber?: string | null | undefined;
  tenantMobile?: string | null | undefined;
  tenantType: TenantType;
  unifiedNumber?: string | null | undefined;
  unitNumber: string;
  unitType: UnitType;
  waterMeter?: string | null | undefined;
  windowAc?: UnitFeatureInput | null | undefined;
};

export type FeePayer =
  | 'GOV_OWNER_OFFICE_TENANT'
  | 'OWNER'
  | 'SPLIT_HALF'
  | 'TENANT';

export type FloorLevel =
  | 'FLOOR_1'
  | 'FLOOR_2'
  | 'FLOOR_3'
  | 'FLOOR_4'
  | 'FLOOR_5'
  | 'FLOOR_6'
  | 'FLOOR_7'
  | 'FLOOR_8'
  | 'FLOOR_9'
  | 'FLOOR_10_PLUS'
  | 'GROUND';

export type LeaseType =
  | 'COMMERCIAL'
  | 'RESIDENTIAL';

export type MapLocationInput = {
  address: string;
  lat?: number | null | undefined;
  lng?: number | null | undefined;
};

export type PaymentFrequency =
  | 'ANNUALLY'
  | 'MONTHLY'
  | 'QUARTERLY'
  | 'SEMI_ANNUALLY';

export type TenantType =
  | 'INDIVIDUAL'
  | 'ORGANIZATION';

export type UnitFeatureInput = {
  count?: number | null | undefined;
  exists: boolean;
};

export type UnitType =
  | 'APARTMENT'
  | 'DRIVER_ROOM'
  | 'FLOOR'
  | 'VILLA';

export type ClientsQueryVariables = Exact<{ [key: string]: never; }>;


export type ClientsQuery = { clients: Array<{ id: string, whatsappNumber: string, isVerified: boolean, createdAt: string, updatedAt: string }> };

export type ClientQueryVariables = Exact<{
  id: string | number;
}>;


export type ClientQuery = { client: { id: string, whatsappNumber: string, isVerified: boolean, createdAt: string, updatedAt: string } };

export type CreateClientMutationVariables = Exact<{
  input: CreateClientInput;
}>;


export type CreateClientMutation = { createClient: { id: string, whatsappNumber: string, isVerified: boolean, createdAt: string } };

export type LeasesQueryVariables = Exact<{ [key: string]: never; }>;


export type LeasesQuery = { leases: Array<{ id: string, clientId: string, ownerMobile: string, ownerId: string, deedNumber: string, unitNumber: string, unitType: UnitType, annualRent: number, contractStartDate: string, contractDuration: ContractDuration, paymentFrequency: PaymentFrequency, tenantType: TenantType, createdAt: string }> };

export type LeaseQueryVariables = Exact<{
  id: string | number;
}>;


export type LeaseQuery = { lease: { id: string, clientId: string, applicantType: ApplicantType, ownerMobile: string, ownerId: string, deedNumber: string, deedDate: string, tenantType: TenantType, tenantIdNumber: string | null, tenantDob: string | null, tenantMobile: string | null, unifiedNumber: string | null, representativeId: string | null, agencyNumber: string | null, contractStartDate: string, contractDuration: ContractDuration, paymentFrequency: PaymentFrequency, annualRent: number, feePayer: FeePayer, unitType: UnitType, unitNumber: string, floor: FloorLevel, areaSqMeters: number, bedrooms: number, bathrooms: number, storageRoom: boolean, maidRoom: boolean, electricityMeter: string, waterMeter: string | null, createdAt: string, updatedAt: string, location: { lat: number | null, lng: number | null, address: string | null } | null, kitchen: { exists: boolean, count: number | null } | null, livingRoom: { exists: boolean, count: number | null } | null, receptionRoom: { exists: boolean, count: number | null } | null, splitAc: { exists: boolean, count: number | null } | null, windowAc: { exists: boolean, count: number | null } | null } };

export type LeasesByClientQueryVariables = Exact<{
  clientId: string | number;
}>;


export type LeasesByClientQuery = { leasesByClient: Array<{ id: string, unitNumber: string, unitType: UnitType, annualRent: number, contractStartDate: string, ownerMobile: string, createdAt: string }> };

export type CreateLeaseMutationVariables = Exact<{
  clientId: string | number;
  input: CreateLeaseInput;
}>;


export type CreateLeaseMutation = { createLease: { id: string, clientId: string, unitNumber: string, annualRent: number, createdAt: string } };


export const ClientsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Clients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"whatsappNumber"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<ClientsQuery, ClientsQueryVariables>;
export const ClientDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Client"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"client"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"whatsappNumber"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<ClientQuery, ClientQueryVariables>;
export const CreateClientDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateClient"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateClientInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createClient"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createClientInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"whatsappNumber"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreateClientMutation, CreateClientMutationVariables>;
export const LeasesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Leases"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leases"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"clientId"}},{"kind":"Field","name":{"kind":"Name","value":"ownerMobile"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"deedNumber"}},{"kind":"Field","name":{"kind":"Name","value":"unitNumber"}},{"kind":"Field","name":{"kind":"Name","value":"unitType"}},{"kind":"Field","name":{"kind":"Name","value":"annualRent"}},{"kind":"Field","name":{"kind":"Name","value":"contractStartDate"}},{"kind":"Field","name":{"kind":"Name","value":"contractDuration"}},{"kind":"Field","name":{"kind":"Name","value":"paymentFrequency"}},{"kind":"Field","name":{"kind":"Name","value":"tenantType"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<LeasesQuery, LeasesQueryVariables>;
export const LeaseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Lease"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lease"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"clientId"}},{"kind":"Field","name":{"kind":"Name","value":"applicantType"}},{"kind":"Field","name":{"kind":"Name","value":"ownerMobile"}},{"kind":"Field","name":{"kind":"Name","value":"ownerId"}},{"kind":"Field","name":{"kind":"Name","value":"deedNumber"}},{"kind":"Field","name":{"kind":"Name","value":"deedDate"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lng"}},{"kind":"Field","name":{"kind":"Name","value":"address"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tenantType"}},{"kind":"Field","name":{"kind":"Name","value":"tenantIdNumber"}},{"kind":"Field","name":{"kind":"Name","value":"tenantDob"}},{"kind":"Field","name":{"kind":"Name","value":"tenantMobile"}},{"kind":"Field","name":{"kind":"Name","value":"unifiedNumber"}},{"kind":"Field","name":{"kind":"Name","value":"representativeId"}},{"kind":"Field","name":{"kind":"Name","value":"agencyNumber"}},{"kind":"Field","name":{"kind":"Name","value":"contractStartDate"}},{"kind":"Field","name":{"kind":"Name","value":"contractDuration"}},{"kind":"Field","name":{"kind":"Name","value":"paymentFrequency"}},{"kind":"Field","name":{"kind":"Name","value":"annualRent"}},{"kind":"Field","name":{"kind":"Name","value":"feePayer"}},{"kind":"Field","name":{"kind":"Name","value":"unitType"}},{"kind":"Field","name":{"kind":"Name","value":"unitNumber"}},{"kind":"Field","name":{"kind":"Name","value":"floor"}},{"kind":"Field","name":{"kind":"Name","value":"areaSqMeters"}},{"kind":"Field","name":{"kind":"Name","value":"bedrooms"}},{"kind":"Field","name":{"kind":"Name","value":"bathrooms"}},{"kind":"Field","name":{"kind":"Name","value":"kitchen"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exists"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"livingRoom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exists"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"receptionRoom"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exists"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"splitAc"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exists"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"windowAc"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"exists"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"storageRoom"}},{"kind":"Field","name":{"kind":"Name","value":"maidRoom"}},{"kind":"Field","name":{"kind":"Name","value":"electricityMeter"}},{"kind":"Field","name":{"kind":"Name","value":"waterMeter"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<LeaseQuery, LeaseQueryVariables>;
export const LeasesByClientDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"LeasesByClient"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"clientId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"leasesByClient"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"clientId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"clientId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"unitNumber"}},{"kind":"Field","name":{"kind":"Name","value":"unitType"}},{"kind":"Field","name":{"kind":"Name","value":"annualRent"}},{"kind":"Field","name":{"kind":"Name","value":"contractStartDate"}},{"kind":"Field","name":{"kind":"Name","value":"ownerMobile"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<LeasesByClientQuery, LeasesByClientQueryVariables>;
export const CreateLeaseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateLease"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"clientId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateLeaseInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createLease"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"clientId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"clientId"}}},{"kind":"Argument","name":{"kind":"Name","value":"createLeaseInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"clientId"}},{"kind":"Field","name":{"kind":"Name","value":"unitNumber"}},{"kind":"Field","name":{"kind":"Name","value":"annualRent"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreateLeaseMutation, CreateLeaseMutationVariables>;