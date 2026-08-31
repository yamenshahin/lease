'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LeaseFormState } from '../lease-form.types';

const schema = z.object({
  contractStartDate: z.string().min(1),
  contractDuration: z.enum([
    'THREE_MONTHS',
    'SIX_MONTHS',
    'ONE_YEAR',
    'TWO_YEARS',
  ]),
  paymentFrequency: z.enum([
    'MONTHLY',
    'QUARTERLY',
    'SEMI_ANNUALLY',
    'ANNUALLY',
  ]),
  annualRent: z.coerce.number().min(3000, 'الحد الأدنى 3000'),
  feePayer: z.enum([
    'OWNER',
    'TENANT',
    'SPLIT_HALF',
    'GOV_OWNER_OFFICE_TENANT',
  ]),
});

type FormValues = z.infer<typeof schema>;

export function Step3Contract({
  defaults,
  onNext,
  onBack,
}: {
  defaults: Pick<
    LeaseFormState,
    | 'contractStartDate'
    | 'contractDuration'
    | 'paymentFrequency'
    | 'annualRent'
    | 'feePayer'
  >;
  onNext: (values: FormValues) => void;
  onBack: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...defaults,
      annualRent:
        defaults.annualRent === '' ? undefined : Number(defaults.annualRent),
    },
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-3">
      <h2 className="text-center text-lg font-semibold">بيانات العقد</h2>

      <label className="block text-sm">تاريخ بداية العقد</label>
      <input
        type="date"
        className="w-full rounded-lg border px-3 py-2"
        {...register('contractStartDate')}
      />

      <label className="block text-sm">مدة العقد</label>
      <select
        className="w-full rounded-lg border px-3 py-2"
        {...register('contractDuration')}
      >
        <option value="THREE_MONTHS">3 أشهر</option>
        <option value="SIX_MONTHS">ستة أشهر</option>
        <option value="ONE_YEAR">سنة</option>
        <option value="TWO_YEARS">سنتان</option>
      </select>

      <label className="block text-sm">طريقة الدفع</label>
      <select
        className="w-full rounded-lg border px-3 py-2"
        {...register('paymentFrequency')}
      >
        <option value="MONTHLY">شهري</option>
        <option value="QUARTERLY">كل 3 أشهر</option>
        <option value="SEMI_ANNUALLY">كل 6 أشهر</option>
        <option value="ANNUALLY">سنوي</option>
      </select>

      <label className="block text-sm">الإيجار السنوي</label>
      <input
        type="number"
        className="w-full rounded-lg border px-3 py-2"
        {...register('annualRent')}
      />
      {errors.annualRent && (
        <p className="text-sm text-red-600">{errors.annualRent.message}</p>
      )}

      <label className="block text-sm">رسوم توثيق العقد</label>
      <select
        className="w-full rounded-lg border px-3 py-2"
        {...register('feePayer')}
      >
        <option value="OWNER">المالك</option>
        <option value="TENANT">المستأجر</option>
        <option value="SPLIT_HALF">مناصفة</option>
        <option value="GOV_OWNER_OFFICE_TENANT">
          الحكومية على المالك / المكتب على المستأجر
        </option>
      </select>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 rounded-lg border py-2"
        >
          رجوع
        </button>
        <button
          type="submit"
          className="flex-1 rounded-lg bg-teal-700 py-2 text-white"
        >
          التالي
        </button>
      </div>
    </form>
  );
}
