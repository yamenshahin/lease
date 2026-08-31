'use client';

import { useState } from 'react';
import {
  initialLeaseFormState,
  LeaseFormState,
  LeaseFormStep,
} from './lease-form.types';

export function useLeaseFormStore() {
  const [state, setState] = useState<LeaseFormState>(initialLeaseFormState);

  const setStep = (step: LeaseFormStep) => setState((s) => ({ ...s, step }));

  const setWhatsappNumber = (whatsappNumber: string) =>
    setState((s) => ({ ...s, whatsappNumber }));

  const setClientId = (clientId: string) =>
    setState((s) => ({ ...s, clientId }));

  return { state, setStep, setWhatsappNumber, setClientId };
}
