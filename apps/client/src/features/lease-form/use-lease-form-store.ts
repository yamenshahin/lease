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

  const patch = (partial: Partial<LeaseFormState>) =>
    setState((s) => ({ ...s, ...partial }));

  const reset = () => setState(initialLeaseFormState);

  return { state, setStep, patch, reset };
}
