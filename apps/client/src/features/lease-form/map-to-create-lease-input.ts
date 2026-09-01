import { LeaseFormState } from './lease-form.types';

function toIsoDate(date: string): string {
  // "2026-08-31" → ISO for DateTime scalar
  return new Date(date).toISOString();
}

function feature(f: { exists: boolean; count?: number }) {
  if (!f.exists) return { exists: false };
  return { exists: true, count: f.count ?? 1 };
}

export function mapToCreateLeaseInput(state: LeaseFormState) {
  const isIndividual = state.tenantType === 'INDIVIDUAL';
  const isOrg = state.tenantType === 'ORGANIZATION';

  return {
    // 1. Add the Lease Type to the GraphQL payload
    leaseType: state.leaseType,

    applicantType: state.applicantType,
    ownerMobile: state.ownerMobile || state.whatsappNumber,
    ownerId: state.ownerId,
    deedNumber: state.deedNumber,
    deedDate: toIsoDate(state.deedDate),
    location: state.locationAddress
      ? { address: state.locationAddress }
      : undefined,

    tenantType: state.tenantType,
    tenantIdNumber: isIndividual
      ? state.tenantIdNumber || undefined
      : undefined,
    tenantDob:
      isIndividual && state.tenantDob ? toIsoDate(state.tenantDob) : undefined,
    tenantMobile: isIndividual ? state.tenantMobile || undefined : undefined,
    unifiedNumber: isOrg ? state.unifiedNumber || undefined : undefined,
    representativeId: isOrg ? state.representativeId || undefined : undefined,
    agencyNumber: isOrg ? state.agencyNumber || undefined : undefined,

    contractStartDate: toIsoDate(state.contractStartDate),
    contractDuration: state.contractDuration,
    paymentFrequency: state.paymentFrequency,
    annualRent: Number(state.annualRent),
    feePayer: state.feePayer,

    unitType: state.unitType,
    unitNumber: state.unitNumber,
    floor: state.floor,
    areaSqMeters: Number(state.areaSqMeters),
    bedrooms: state.bedrooms,
    bathrooms: state.bathrooms,
    kitchen: feature(state.kitchen),
    livingRoom: feature(state.livingRoom),
    receptionRoom: feature(state.receptionRoom),
    splitAc: feature(state.splitAc),
    windowAc: feature(state.windowAc),
    storageRoom: state.storageRoom,
    maidRoom: state.maidRoom,
    electricityMeter: state.electricityMeter,
    waterMeter: state.waterMeter || undefined,
  };
}
