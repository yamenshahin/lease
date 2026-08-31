export type LeaseFormStep = 1 | 2 | 3 | 4;

export type ApplicantType = 'OWNER_OR_REP' | 'TENANT';
export type TenantType = 'INDIVIDUAL' | 'ORGANIZATION';
export type ContractDuration =
  | 'THREE_MONTHS'
  | 'SIX_MONTHS'
  | 'ONE_YEAR'
  | 'TWO_YEARS';
export type PaymentFrequency =
  | 'MONTHLY'
  | 'QUARTERLY'
  | 'SEMI_ANNUALLY'
  | 'ANNUALLY';
export type FeePayer =
  | 'OWNER'
  | 'TENANT'
  | 'SPLIT_HALF'
  | 'GOV_OWNER_OFFICE_TENANT';
export type UnitType = 'APARTMENT' | 'FLOOR' | 'DRIVER_ROOM' | 'VILLA';
export type FloorLevel =
  | 'GROUND'
  | 'FLOOR_1'
  | 'FLOOR_2'
  | 'FLOOR_3'
  | 'FLOOR_4'
  | 'FLOOR_5'
  | 'FLOOR_6'
  | 'FLOOR_7'
  | 'FLOOR_8'
  | 'FLOOR_9'
  | 'FLOOR_10_PLUS';

export type UnitFeatureForm = {
  exists: boolean;
  count?: number;
};

/** Empty string = placeholder "اختر" (not yet selected) */
export type LeaseFormState = {
  step: LeaseFormStep;
  clientId: string | null;

  // Step 1
  whatsappNumber: string;
  applicantType: ApplicantType | '';
  ownerMobile: string;
  ownerId: string;
  deedNumber: string;
  deedDate: string;
  locationAddress: string;

  // Step 2
  tenantType: TenantType | '';
  tenantIdNumber: string;
  tenantDob: string;
  tenantMobile: string;
  unifiedNumber: string;
  representativeId: string;
  agencyNumber: string;

  // Step 3
  contractStartDate: string;
  contractDuration: ContractDuration | '';
  paymentFrequency: PaymentFrequency | '';
  annualRent: number | '';
  feePayer: FeePayer | '';

  // Step 4
  unitType: UnitType | '';
  unitNumber: string;
  floor: FloorLevel | '';
  areaSqMeters: number | '';
  bedrooms: number | '';
  bathrooms: number | '';
  kitchen: UnitFeatureForm;
  livingRoom: UnitFeatureForm;
  receptionRoom: UnitFeatureForm;
  splitAc: UnitFeatureForm;
  windowAc: UnitFeatureForm;
  storageRoom: boolean;
  maidRoom: boolean;
  electricityMeter: string;
  waterMeter: string;
};

export const initialLeaseFormState: LeaseFormState = {
  step: 1,
  clientId: null,

  whatsappNumber: '',
  applicantType: '',
  ownerMobile: '',
  ownerId: '',
  deedNumber: '',
  deedDate: '',
  locationAddress: '',

  tenantType: '',
  tenantIdNumber: '',
  tenantDob: '',
  tenantMobile: '',
  unifiedNumber: '',
  representativeId: '',
  agencyNumber: '',

  contractStartDate: '',
  contractDuration: '',
  paymentFrequency: '',
  annualRent: '',
  feePayer: '',

  unitType: '',
  unitNumber: '',
  floor: '',
  areaSqMeters: '',
  bedrooms: '',
  bathrooms: '',
  kitchen: { exists: false },
  livingRoom: { exists: false },
  receptionRoom: { exists: false },
  splitAc: { exists: false },
  windowAc: { exists: false },
  storageRoom: false,
  maidRoom: false,
  electricityMeter: '',
  waterMeter: '',
};
