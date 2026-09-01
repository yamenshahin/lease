'use client';

import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateClient } from '@lease-app/data-access';
import { LeaseFormState } from '../lease-form.types';

const schema = z.object({
  whatsappNumber: z
    .string()
    .regex(/^05\d{8}$/, 'صيغة الجوال غير صحيحة (مثال: 05XXXXXXXX)'),
  applicantType: z
    .string()
    .min(1, 'الرجاء اختيار مقدم الطلب')
    .refine((val) => val === 'OWNER_OR_REP' || val === 'TENANT', {
      message: 'الرجاء اختيار مقدم الطلب',
    }),
  ownerMobile: z
    .string()
    .regex(/^05\d{8}$/, 'صيغة الجوال غير صحيحة (مثال: 05XXXXXXXX)'),
  ownerId: z.string().length(10, 'يجب أن تتكون هوية المالك من 10 أرقام'),
  deedNumber: z
    .string()
    .min(1, 'رقم الصك مطلوب')
    .max(12, 'يجب ألا يتجاوز رقم الصك 12 رقماً'),
  deedDate: z.string().min(1, 'تاريخ الصك مطلوب'),
  locationAddress: z.string().min(1, 'العنوان / موقع العقار مطلوب'), // 👈 Now strictly required
});

type FormValues = z.infer<typeof schema>;

function selectClass(hasValue: boolean) {
  return `w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-right ${
    hasValue ? 'text-slate-900' : 'text-slate-400'
  }`;
}

export function Step1Basic({
  defaults,
  onSuccess,
}: {
  defaults: Pick<
    LeaseFormState,
    | 'whatsappNumber'
    | 'applicantType'
    | 'ownerMobile'
    | 'ownerId'
    | 'deedNumber'
    | 'deedDate'
    | 'locationAddress'
  >;
  onSuccess: (clientId: string, values: FormValues) => void;
}) {
  const createClient = useCreateClient();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      whatsappNumber: defaults.whatsappNumber ?? '',
      applicantType:
        (defaults.applicantType as FormValues['applicantType']) || '',
      ownerMobile: defaults.ownerMobile || defaults.whatsappNumber || '',
      ownerId: defaults.ownerId ?? '',
      deedNumber: defaults.deedNumber ?? '',
      deedDate: defaults.deedDate ?? '',
      locationAddress: defaults.locationAddress ?? '',
    },
  });

  const applicantType = useWatch({ control, name: 'applicantType' });

  const onSubmit = handleSubmit(async (values) => {
    const client = await createClient.mutateAsync(values.whatsappNumber);
    onSuccess(client.id, values);
  });

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <h2 className="text-center text-lg font-semibold text-slate-800">
        معلومات أساسية
      </h2>

      <div>
        <label className="block text-sm text-slate-600 mb-1">مقدم الطلب</label>
        <select
          className={selectClass(!!applicantType)}
          {...register('applicantType')}
          defaultValue=""
        >
          <option value="" disabled className="text-slate-400">
            اختر
          </option>
          <option value="OWNER_OR_REP" className="text-slate-900">
            المالك أو ممثله
          </option>
          <option value="TENANT" className="text-slate-900">
            المستأجر
          </option>
        </select>
        {errors.applicantType && (
          <p className="text-sm text-red-600">{errors.applicantType.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm text-slate-600 mb-1">
          جوال التحقق (واتساب)
        </label>
        <input
          dir="ltr"
          className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-right placeholder:text-right placeholder:text-slate-400 focus:border-[#14723d] focus:outline-none focus:ring-1 focus:ring-[#14723d]"
          maxLength={10}
          placeholder="05xxxxxxxx"
          {...register('whatsappNumber')}
        />
        {errors.whatsappNumber && (
          <p className="text-sm text-red-600">
            {errors.whatsappNumber.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm text-slate-600 mb-1">جوال المالك</label>
        <input
          dir="ltr"
          className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-right placeholder:text-right placeholder:text-slate-400 focus:border-[#14723d] focus:outline-none focus:ring-1 focus:ring-[#14723d]"
          maxLength={10}
          placeholder="05xxxxxxxx"
          {...register('ownerMobile')}
        />
        {errors.ownerMobile && (
          <p className="text-sm text-red-600">{errors.ownerMobile.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm text-slate-600 mb-1">هوية المالك</label>
        <input
          dir="ltr"
          className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-right placeholder:text-right placeholder:text-slate-400 focus:border-[#14723d] focus:outline-none focus:ring-1 focus:ring-[#14723d]"
          maxLength={10}
          placeholder="10 أرقام"
          {...register('ownerId')}
        />
        {errors.ownerId && (
          <p className="text-sm text-red-600">{errors.ownerId.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm text-slate-600 mb-1">رقم الصك</label>
        <input
          dir="ltr"
          className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-right placeholder:text-right placeholder:text-slate-400 focus:border-[#14723d] focus:outline-none focus:ring-1 focus:ring-[#14723d]"
          maxLength={12}
          placeholder="حتى 12 رقم"
          {...register('deedNumber')}
        />
        {errors.deedNumber && (
          <p className="text-sm text-red-600">{errors.deedNumber.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm text-slate-600 mb-1">تاريخ الصك</label>
        <input
          type="date"
          className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-right focus:border-[#14723d] focus:outline-none focus:ring-1 focus:ring-[#14723d]"
          {...register('deedDate')}
        />
        {errors.deedDate && (
          <p className="text-sm text-red-600">{errors.deedDate.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm text-slate-600 mb-1">
          عنوان / موقع العقار
        </label>
        <input
          className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-right placeholder:text-right placeholder:text-slate-400 focus:border-[#14723d] focus:outline-none focus:ring-1 focus:ring-[#14723d]"
          placeholder="المدينة، الحي، الشارع"
          {...register('locationAddress')}
        />
        {/* 👈 Added the error text render block */}
        {errors.locationAddress && (
          <p className="text-sm text-red-600">
            {errors.locationAddress.message}
          </p>
        )}
      </div>

      <div className="pt-1">
        <button
          type="submit"
          disabled={createClient.isPending}
          className="w-full rounded-xl bg-[#14723d] hover:bg-[#105a30] transition-colors py-2.5 text-white disabled:opacity-60"
        >
          {createClient.isPending ? 'جاري الحفظ...' : 'التالي'}
        </button>
      </div>
    </form>
  );
}
