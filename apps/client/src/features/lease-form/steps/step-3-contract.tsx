'use client';

import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LeaseFormState } from '../lease-form.types';

const schema = z.object({
  contractStartDate: z.string().min(1, 'تاريخ بداية العقد مطلوب'),
  contractDuration: z.enum(
    ['THREE_MONTHS', 'SIX_MONTHS', 'ONE_YEAR', 'TWO_YEARS'],
    { required_error: 'الرجاء اختيار مدة العقد' },
  ),
  paymentFrequency: z.enum(
    ['MONTHLY', 'QUARTERLY', 'SEMI_ANNUALLY', 'ANNUALLY'],
    { required_error: 'الرجاء اختيار طريقة الدفع' },
  ),
  annualRent: z.coerce
    .number({
      required_error: 'قيمة الإيجار مطلوبة',
      invalid_type_error: 'الرجاء إدخال أرقام فقط',
    })
    .min(3000, 'الحد الأدنى للإيجار هو 3000 ريال'),
  feePayer: z.enum(
    ['OWNER', 'TENANT', 'SPLIT_HALF', 'GOV_OWNER_OFFICE_TENANT'],
    { required_error: 'الرجاء تحديد من سيدفع الرسوم' },
  ),
});

type FormValues = z.infer<typeof schema>;

function selectClass(hasValue: boolean) {
  return `w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-right ${
    hasValue ? 'text-slate-900' : 'text-slate-400'
  }`;
}

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
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      contractStartDate: defaults.contractStartDate || '',
      contractDuration: defaults.contractDuration || undefined,
      paymentFrequency: defaults.paymentFrequency || undefined,
      annualRent:
        defaults.annualRent === '' ? undefined : Number(defaults.annualRent),
      feePayer: defaults.feePayer || undefined,
    },
  });

  const contractDuration = useWatch({ control, name: 'contractDuration' });
  const paymentFrequency = useWatch({ control, name: 'paymentFrequency' });
  const feePayer = useWatch({ control, name: 'feePayer' });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-3">
      <h2 className="text-center text-lg font-semibold">بيانات العقد</h2>

      <div>
        <label className="block text-sm text-slate-600 mb-1">
          تاريخ بداية العقد
        </label>
        <input
          type="date"
          className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-right"
          {...register('contractStartDate')}
        />
        {errors.contractStartDate && (
          <p className="text-sm text-red-600">
            {errors.contractStartDate.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm text-slate-600 mb-1">مدة العقد</label>
        <select
          className={selectClass(!!contractDuration)}
          {...register('contractDuration')}
          defaultValue=""
        >
          <option value="" disabled className="text-slate-400">
            اختر مدة العقد
          </option>
          <option value="THREE_MONTHS" className="text-slate-900">
            3 أشهر
          </option>
          <option value="SIX_MONTHS" className="text-slate-900">
            ستة أشهر
          </option>
          <option value="ONE_YEAR" className="text-slate-900">
            سنة
          </option>
          <option value="TWO_YEARS" className="text-slate-900">
            سنتان
          </option>
        </select>
        {errors.contractDuration && (
          <p className="text-sm text-red-600">
            {errors.contractDuration.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm text-slate-600 mb-1">
          طريقة دفع الإيجار
        </label>
        <select
          className={selectClass(!!paymentFrequency)}
          {...register('paymentFrequency')}
          defaultValue=""
        >
          <option value="" disabled className="text-slate-400">
            اختر طريقة دفع الإيجار
          </option>
          <option value="MONTHLY" className="text-slate-900">
            شهري
          </option>
          <option value="QUARTERLY" className="text-slate-900">
            كل 3 أشهر
          </option>
          <option value="SEMI_ANNUALLY" className="text-slate-900">
            كل 6 أشهر
          </option>
          <option value="ANNUALLY" className="text-slate-900">
            سنوي
          </option>
        </select>
        {errors.paymentFrequency && (
          <p className="text-sm text-red-600">
            {errors.paymentFrequency.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm text-slate-600 mb-1">
          الإيجار السنوي
        </label>
        <input
          type="number"
          className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-right placeholder:text-right"
          placeholder="3000+"
          {...register('annualRent')}
        />
        {errors.annualRent && (
          <p className="text-sm text-red-600">{errors.annualRent.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm text-slate-600 mb-1">
          رسوم توثيق العقد الإلكتروني
        </label>
        <select
          className={selectClass(!!feePayer)}
          {...register('feePayer')}
          defaultValue=""
        >
          <option value="" disabled className="text-slate-400">
            اختر من سيدفع الرسوم
          </option>
          <option value="OWNER" className="text-slate-900">
            المالك
          </option>
          <option value="TENANT" className="text-slate-900">
            المستأجر
          </option>
          <option value="SPLIT_HALF" className="text-slate-900">
            مناصفة
          </option>
          <option value="GOV_OWNER_OFFICE_TENANT" className="text-slate-900">
            الحكومية على المالك / المكتب على المستأجر
          </option>
        </select>
        {errors.feePayer && (
          <p className="text-sm text-red-600">{errors.feePayer.message}</p>
        )}
      </div>

      <div className="flex gap-2 pt-1">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 rounded-xl border border-slate-200 py-2.5"
        >
          رجوع
        </button>
        <button
          type="submit"
          className="flex-1 rounded-xl bg-teal-700 py-2.5 text-white"
        >
          التالي
        </button>
      </div>
    </form>
  );
}
