'use client';

import { useState } from 'react';
import { LeaseFormShell } from '../../features/lease-form/lease-form-shell';
import { useLeaseFormStore } from '../../features/lease-form/use-lease-form-store';
import { Step1Basic } from '../../features/lease-form/steps/step-1-basic';
import { Step2Tenant } from '../../features/lease-form/steps/step-2-tenant';
import { Step3Contract } from '../../features/lease-form/steps/step-3-contract';
import { Step4Unit } from '../../features/lease-form/steps/step-4-unit';

export default function LeasePage() {
  const { state, setStep, patch, reset } = useLeaseFormStore();
  const [doneLeaseId, setDoneLeaseId] = useState<string | null>(null);

  if (doneLeaseId) {
    return (
      <LeaseFormShell step={4}>
        <div className="space-y-3 text-center">
          <h2 className="text-lg font-semibold text-teal-800">
            تم إرسال الطلب
          </h2>
          <p className="text-sm text-gray-600">رقم الطلب: {doneLeaseId}</p>
          <button
            type="button"
            className="rounded-lg bg-teal-700 px-4 py-2 text-white"
            onClick={() => {
              setDoneLeaseId(null);
              reset();
            }}
          >
            طلب جديد
          </button>
        </div>
      </LeaseFormShell>
    );
  }

  return (
    <LeaseFormShell step={state.step}>
      {state.step === 1 && (
        <Step1Basic
          defaults={state}
          onSuccess={(clientId, values) => {
            patch({ clientId, ...values });
            setStep(2);
          }}
        />
      )}

      {state.step === 2 && (
        <Step2Tenant
          defaults={state}
          onBack={() => setStep(1)}
          onNext={(values) => {
            patch(values);
            setStep(3);
          }}
        />
      )}

      {state.step === 3 && (
        <Step3Contract
          defaults={state}
          onBack={() => setStep(2)}
          onNext={(values) => {
            patch({ ...values, annualRent: values.annualRent });
            setStep(4);
          }}
        />
      )}

      {state.step === 4 && (
        <Step4Unit
          state={state}
          onBack={() => setStep(3)}
          onSuccess={(leaseId) => setDoneLeaseId(leaseId)}
        />
      )}
    </LeaseFormShell>
  );
}
