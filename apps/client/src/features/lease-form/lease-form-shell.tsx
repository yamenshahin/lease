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
    <div className="min-h-screen bg-[#14723d] px-4 py-8">
      <h1 className="mb-6 text-center text-2xl font-bold text-white">
        طلب توثيق عقد إيجار
      </h1>

      <div className="mx-auto mb-6 flex max-w-md justify-center gap-3">
        {STEPS.map((s) => (
          <div
            key={s.id}
            className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
              s.id === step
                ? 'bg-[#ba2931] text-white shadow-md'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            {s.id}
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-md rounded-2xl bg-white p-6 shadow-lg">
        {children}
      </div>
    </div>
  );
}
