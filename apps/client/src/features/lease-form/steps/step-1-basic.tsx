'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateClient } from '@lease-app/data-access';
import { ApplicantType, LeaseFormState } from '../lease-form.types';

const schema = z.object({
  whatsappNumber: z.string().regex(/^05\d{8}$/, 'صيغة الجوال 05xxxxxxxx'),
  applicantType: z.enum(['OWNER_OR_REP', 'TENANT']),
  ownerMobile: z.string().regex(/^05\d{8}$/, 'صيغة الجوال 05xxxxxxxx'),
  ownerId: z.string().length(10, 'الهوية 10 أرقام'),
  deedNumber: z.string().min(1, 'مطلوب').max(12),
  deedDate: z.string().min(1, 'مطلوب'),
  locationAddress: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

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
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...defaults,
      ownerMobile: defaults.ownerMobile || defaults.whatsappNumber,
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    const client = await createClient.mutateAsync(values.whatsappNumber);
    onSuccess(client.id, values);
  });

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <h2 className="text-center text-lg font-semibold">معلومات أساسية</h2>

      <label className="block text-sm">مقدم الطلب</label>
      <select
        className="w-full rounded-lg border px-3 py-2"
        {...register('applicantType')}
      >
        <option value="OWNER_OR_REP">المالك أو ممثله</option>
        <option value="TENANT">المستأجر</option>
      </select>

      <label className="block text-sm">جوال التحقق (واتساب)</label>
      <input
        dir="ltr"
        className="w-full rounded-lg border px-3 py-2"
        maxLength={10}
        {...register('whatsappNumber')}
      />
      {errors.whatsappNumber && (
        <p className="text-sm text-red-600">{errors.whatsappNumber.message}</p>
      )}

      <label className="block text-sm">جوال المالك</label>
      <input
        dir="ltr"
        className="w-full rounded-lg border px-3 py-2"
        maxLength={10}
        {...register('ownerMobile')}
      />

      <label className="block text-sm">هوية المالك</label>
      <input
        dir="ltr"
        className="w-full rounded-lg border px-3 py-2"
        maxLength={10}
        {...register('ownerId')}
      />

      <label className="block text-sm">رقم الصك</label>
      <input
        dir="ltr"
        className="w-full rounded-lg border px-3 py-2"
        maxLength={12}
        {...register('deedNumber')}
      />

      <label className="block text-sm">تاريخ الصك</label>
      <input
        type="date"
        className="w-full rounded-lg border px-3 py-2"
        {...register('deedDate')}
      />

      <label className="block text-sm">عنوان / موقع العقار</label>
      <input
        className="w-full rounded-lg border px-3 py-2"
        {...register('locationAddress')}
      />

      <button
        type="submit"
        disabled={createClient.isPending}
        className="w-full rounded-lg bg-teal-700 py-2.5 text-white disabled:opacity-60"
      >
        {createClient.isPending ? 'جاري الحفظ...' : 'التالي'}
      </button>
    </form>
  );
}
