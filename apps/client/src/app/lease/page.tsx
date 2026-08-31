'use client';

import { LeaseFormShell } from '../../features/lease-form/lease-form-shell';
import { useLeaseFormStore } from '../../features/lease-form/use-lease-form-store';
import { StepPhone } from '../../features/lease-form/steps/step-phone';

export default function LeasePage() {
  const { state, setStep, setWhatsappNumber, setClientId } =
    useLeaseFormStore();

  return (
    <LeaseFormShell step={state.step}>
      {state.step === 1 && (
        <StepPhone
          defaultWhatsapp={state.whatsappNumber}
          onSuccess={(clientId, whatsappNumber) => {
            setClientId(clientId);
            setWhatsappNumber(whatsappNumber);
            setStep(2);
          }}
        />
      )}

      {state.step === 2 && (
        <div className="space-y-3 text-center">
          <p>الخطوة 2 (قريباً)</p>
          <p className="text-sm text-gray-500">clientId: {state.clientId}</p>
          <button
            type="button"
            className="text-teal-700 underline"
            onClick={() => setStep(1)}
          >
            رجوع
          </button>
        </div>
      )}
    </LeaseFormShell>
  );
}
