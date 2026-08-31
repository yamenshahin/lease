'use client';

import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LeaseFormState, TenantType } from '../lease-form.types';

const schema = z
  .object({
    tenantType: z.enum(['INDIVIDUAL', 'ORGANIZATION']),
    tenantIdNumber: z.string().optional(),
    tenantDob: z.string().optional(),
    tenantMobile: z.string().optional(),
    unifiedNumber: z.string().optional(),
    representativeId: z.string().optional(),
    agencyNumber: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.tenantType === 'INDIVIDUAL') {
      if (!data.tenantIdNumber || data.tenantIdNumber.length !== 10) {
        ctx.addIssue({
          code: 'custom',
          message: 'هوية المستأجر 10 أرقام',
          path: ['tenantIdNumber'],
        });
      }
      if (!data.tenantDob) {
        ctx.addIssue({
          code: 'custom',
          message: 'تاريخ الميلاد مطلوب',
          path: ['tenantDob'],
        });
      }
      if (!data.tenantMobile || !/^05\d{8}$/.test(data.tenantMobile)) {
        ctx.addIssue({
          code: 'custom',
          message: 'جوال غير صالح',
          path: ['tenantMobile'],
        });
      }
    }
    if (data.tenantType === 'ORGANIZATION') {
      if (!data.unifiedNumber || data.unifiedNumber.length !== 10) {
        ctx.addIssue({
          code: 'custom',
          message: 'الرقم الموحد 10 أرقام',
          path: ['unifiedNumber'],
        });
      }
      if (!data.representativeId || data.representativeId.length !== 10) {
        ctx.addIssue({
          code: 'custom',
          message: 'هوية الممثل 10 أرقام',
          path: ['representativeId'],
        });
      }
    }
  });

type FormValues = z.infer<typeof schema>;

export function Step2Tenant({
  defaults,
  onNext,
  onBack,
}: {
  defaults: Pick<
    LeaseFormState,
    | 'tenantType'
    | 'tenantIdNumber'
    | 'tenantDob'
    | 'tenantMobile'
    | 'unifiedNumber'
    | 'representativeId'
    | 'agencyNumber'
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
    defaultValues: defaults,
  });

  const tenantType = useWatch({ control, name: 'tenantType' }) as TenantType;

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-3">
      <h2 className="text-center text-lg font-semibold">بيانات المستأجر</h2>

      <div className="flex gap-2">
        <label className="flex flex-1 items-center gap-2 rounded-lg border p-2">
          <input type="radio" value="INDIVIDUAL" {...register('tenantType')} />
          فرد
        </label>
        <label className="flex flex-1 items-center gap-2 rounded-lg border p-2">
          <input
            type="radio"
            value="ORGANIZATION"
            {...register('tenantType')}
          />
          منشأة
        </label>
      </div>

      {tenantType === 'INDIVIDUAL' && (
        <>
          <input
            dir="ltr"
            placeholder="هوية المستأجر"
            className="w-full rounded-lg border px-3 py-2"
            maxLength={10}
            {...register('tenantIdNumber')}
          />
          {errors.tenantIdNumber && (
            <p className="text-sm text-red-600">
              {errors.tenantIdNumber.message}
            </p>
          )}
          <input
            type="date"
            className="w-full rounded-lg border px-3 py-2"
            {...register('tenantDob')}
          />
          <input
            dir="ltr"
            placeholder="جوال المستأجر"
            className="w-full rounded-lg border px-3 py-2"
            maxLength={10}
            {...register('tenantMobile')}
          />
        </>
      )}

      {tenantType === 'ORGANIZATION' && (
        <>
          <input
            dir="ltr"
            placeholder="الرقم الموحد"
            className="w-full rounded-lg border px-3 py-2"
            maxLength={10}
            {...register('unifiedNumber')}
          />
          <input
            dir="ltr"
            placeholder="هوية الممثل"
            className="w-full rounded-lg border px-3 py-2"
            maxLength={10}
            {...register('representativeId')}
          />
          <input
            dir="ltr"
            placeholder="رقم الوكالة (اختياري)"
            className="w-full rounded-lg border px-3 py-2"
            {...register('agencyNumber')}
          />
        </>
      )}

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
