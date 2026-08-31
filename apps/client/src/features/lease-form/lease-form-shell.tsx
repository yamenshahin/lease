'use client';

import { LeaseFormStep } from './lease-form.types';

const STEPS: { id: LeaseFormStep; label: string }[] = [
  { id: 1, label: 'معلومات أساسية' },
  { id: 2, label: 'المستأجر' },
  { id: 3, label: 'العقد' },
  { id: 4, label: 'الوحدة' },
];

export function LeaseFormShell({
  step,
  children,
}: {
  step: LeaseFormStep;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-teal-800 px-4 py-8">
      <h1 className="mb-6 text-center text-2xl font-bold text-white">
        طلب توثيق عقد إيجار
      </h1>

      <div className="mx-auto mb-6 flex max-w-md justify-center gap-3">
        {STEPS.map((s) => (
          <div
            key={s.id}
            className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${
              s.id === step
                ? 'bg-teal-300 text-teal-900'
                : 'bg-teal-700 text-teal-100'
            }`}
          >
            {s.id}
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-md rounded-2xl bg-white p-6 shadow">
        {children}
      </div>
    </div>
  );
}
