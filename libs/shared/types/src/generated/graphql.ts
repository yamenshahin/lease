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

export type MapLocationInput = {
  address?: string | null | undefined;
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


export type ClientsQuery = { clients: Array<{ id: string, whatsappNumber: string, isVerified: boolean, createdAt: string }> };

export type CreateClientMutationVariables = Exact<{
  input: CreateClientInput;
}>;


export type CreateClientMutation = { createClient: { id: string, whatsappNumber: string, isVerified: boolean, createdAt: string } };

export type CreateLeaseMutationVariables = Exact<{
  clientId: string | number;
  input: CreateLeaseInput;
}>;


export type CreateLeaseMutation = { createLease: { id: string, clientId: string, unitNumber: string, annualRent: number, createdAt: string } };


export const ClientsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Clients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"clients"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"whatsappNumber"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<ClientsQuery, ClientsQueryVariables>;
export const CreateClientDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateClient"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateClientInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createClient"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createClientInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"whatsappNumber"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreateClientMutation, CreateClientMutationVariables>;
export const CreateLeaseDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateLease"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"clientId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateLeaseInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createLease"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"clientId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"clientId"}}},{"kind":"Argument","name":{"kind":"Name","value":"createLeaseInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"clientId"}},{"kind":"Field","name":{"kind":"Name","value":"unitNumber"}},{"kind":"Field","name":{"kind":"Name","value":"annualRent"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CreateLeaseMutation, CreateLeaseMutationVariables>;