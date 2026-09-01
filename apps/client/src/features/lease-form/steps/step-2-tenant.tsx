'use client';

import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LeaseFormState, TenantType } from '../lease-form.types';

const schema = z
  .object({
    tenantType: z
      .string()
      .min(1, 'الرجاء اختيار صفة المستأجر')
      .refine((val) => val === 'INDIVIDUAL' || val === 'ORGANIZATION', {
        message: 'الرجاء اختيار صفة المستأجر',
      }),
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
          message: 'يجب أن تتكون هوية المستأجر من 10 أرقام',
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
          message: 'صيغة الجوال غير صحيحة (مثال: 05XXXXXXXX)',
          path: ['tenantMobile'],
        });
      }
    }
    if (data.tenantType === 'ORGANIZATION') {
      if (!data.unifiedNumber || data.unifiedNumber.length !== 10) {
        ctx.addIssue({
          code: 'custom',
          message: 'يجب أن يتكون الرقم الموحد من 10 أرقام',
          path: ['unifiedNumber'],
        });
      }
      if (!data.representativeId || data.representativeId.length !== 10) {
        ctx.addIssue({
          code: 'custom',
          message: 'يجب أن تتكون هوية الممثل من 10 أرقام',
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
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...defaults,
      tenantType: (defaults.tenantType as FormValues['tenantType']) || '',
    },
  });

  const tenantType = useWatch({ control, name: 'tenantType' }) as
    | TenantType
    | '';

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-3">
      <h2 className="text-center text-lg font-semibold text-slate-800">
        معلومات المستأجر
      </h2>

      <label className="block text-sm text-slate-600">صفة المستأجر</label>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() =>
            setValue('tenantType', 'INDIVIDUAL', { shouldValidate: true })
          }
          className={`flex-1 rounded-full border py-2.5 text-sm font-medium transition-colors ${
            tenantType === 'INDIVIDUAL'
              ? 'border-[#14723d] bg-[#14723d] text-white'
              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
          }`}
        >
          فرد
        </button>
        <button
          type="button"
          onClick={() =>
            setValue('tenantType', 'ORGANIZATION', { shouldValidate: true })
          }
          className={`flex-1 rounded-full border py-2.5 text-sm font-medium transition-colors ${
            tenantType === 'ORGANIZATION'
              ? 'border-[#14723d] bg-[#14723d] text-white'
              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
          }`}
        >
          منشأة
        </button>
      </div>
      {errors.tenantType && (
        <p className="text-sm text-red-600">{errors.tenantType.message}</p>
      )}

      {tenantType === 'INDIVIDUAL' && (
        <>
          <div>
            <label className="block text-sm text-slate-600 mb-1">
              هوية المستأجر
            </label>
            <input
              dir="ltr"
              placeholder="10 أرقام"
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-right placeholder:text-right placeholder:text-slate-400 focus:border-[#14723d] focus:outline-none focus:ring-1 focus:ring-[#14723d]"
              maxLength={10}
              {...register('tenantIdNumber')}
            />
            {errors.tenantIdNumber && (
              <p className="text-sm text-red-600">
                {errors.tenantIdNumber.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">
              تاريخ الميلاد
            </label>
            <input
              type="date"
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-right focus:border-[#14723d] focus:outline-none focus:ring-1 focus:ring-[#14723d]"
              {...register('tenantDob')}
            />
            {errors.tenantDob && (
              <p className="text-sm text-red-600">{errors.tenantDob.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">
              جوال المستأجر
            </label>
            <input
              dir="ltr"
              placeholder="05xxxxxxxx"
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-right placeholder:text-right placeholder:text-slate-400 focus:border-[#14723d] focus:outline-none focus:ring-1 focus:ring-[#14723d]"
              maxLength={10}
              {...register('tenantMobile')}
            />
            {errors.tenantMobile && (
              <p className="text-sm text-red-600">
                {errors.tenantMobile.message}
              </p>
            )}
          </div>
        </>
      )}

      {tenantType === 'ORGANIZATION' && (
        <>
          <div>
            <label className="block text-sm text-slate-600 mb-1">
              الرقم الموحد
            </label>
            <input
              dir="ltr"
              placeholder="10 أرقام"
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-right placeholder:text-right placeholder:text-slate-400 focus:border-[#14723d] focus:outline-none focus:ring-1 focus:ring-[#14723d]"
              maxLength={10}
              {...register('unifiedNumber')}
            />
            {errors.unifiedNumber && (
              <p className="text-sm text-red-600">
                {errors.unifiedNumber.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">
              هوية الممثل
            </label>
            <input
              dir="ltr"
              placeholder="10 أرقام"
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-right placeholder:text-right placeholder:text-slate-400 focus:border-[#14723d] focus:outline-none focus:ring-1 focus:ring-[#14723d]"
              maxLength={10}
              {...register('representativeId')}
            />
            {errors.representativeId && (
              <p className="text-sm text-red-600">
                {errors.representativeId.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm text-slate-600 mb-1">
              رقم الوكالة
            </label>
            <input
              dir="ltr"
              placeholder="اختياري"
              className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-right placeholder:text-right placeholder:text-slate-400 focus:border-[#14723d] focus:outline-none focus:ring-1 focus:ring-[#14723d]"
              {...register('agencyNumber')}
            />
          </div>
        </>
      )}

      <div className="flex gap-2 pt-1">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 rounded-xl border border-slate-200 py-2.5 hover:bg-slate-50 transition-colors"
        >
          رجوع
        </button>
        <button
          type="submit"
          className="flex-1 rounded-xl bg-[#14723d] hover:bg-[#105a30] transition-colors py-2.5 text-white"
        >
          التالي
        </button>
      </div>
    </form>
  );
}
