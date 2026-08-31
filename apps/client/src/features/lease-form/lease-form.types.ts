export type LeaseFormStep = 1 | 2 | 3 | 4;

export type LeaseFormState = {
  step: LeaseFormStep;
  /** Set after createClient (later: after verifyOtp) */
  clientId: string | null;
  whatsappNumber: string;
  // Steps 2–4 fields added later; submit maps to CreateLeaseInput
};

export const initialLeaseFormState: LeaseFormState = {
  step: 1,
  clientId: null,
  whatsappNumber: '',
};
