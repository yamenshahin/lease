'use client';

import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateLease } from '@lease-app/data-access';
import { LeaseFormState, UnitType, FloorLevel } from '../lease-form.types';
import { mapToCreateLeaseInput } from '../map-to-create-lease-input';

const schema = z.object({
  unitType: z
    .string()
    .min(1, 'الرجاء اختيار نوع الوحدة')
    .refine(
      (val) => ['APARTMENT', 'FLOOR', 'DRIVER_ROOM', 'VILLA'].includes(val),
      { message: 'الرجاء اختيار نوع الوحدة' },
    ) as z.ZodType<UnitType>,
  unitNumber: z.string().min(1, 'رقم الوحدة مطلوب'),
  floor: z
    .string()
    .min(1, 'الرجاء اختيار الدور')
    .refine(
      (val) =>
        [
          'GROUND',
          'FLOOR_1',
          'FLOOR_2',
          'FLOOR_3',
          'FLOOR_4',
          'FLOOR_5',
          'FLOOR_6',
          'FLOOR_7',
          'FLOOR_8',
          'FLOOR_9',
          'FLOOR_10_PLUS',
        ].includes(val),
      { message: 'الرجاء اختيار الدور' },
    ) as z.ZodType<FloorLevel>,
  areaSqMeters: z.coerce
    .number({
      message: 'المساحة مطلوبة (أرقام فقط)',
    })
    .positive('يجب أن تكون المساحة أكبر من صفر'),
  bedrooms: z
    .string()
    .min(1, 'الرجاء اختيار عدد غرف النوم')
    .transform(Number)
    .refine((val) => val >= 1 && val <= 4, {
      message: 'الرجاء اختيار عدد غرف النوم',
    }),
  bathrooms: z
    .string()
    .min(1, 'الرجاء اختيار عدد الحمامات')
    .transform(Number)
    .refine((val) => val >= 1 && val <= 4, {
      message: 'الرجاء اختيار عدد الحمامات',
    }),
  kitchenExists: z.boolean(),
  kitchenCount: z.coerce.number().min(1).max(3).optional(),
  livingRoomExists: z.boolean(),
  livingRoomCount: z.coerce.number().min(1).max(3).optional(),
  receptionRoomExists: z.boolean(),
  receptionRoomCount: z.coerce.number().min(1).max(3).optional(),
  splitAcExists: z.boolean(),
  splitAcCount: z.coerce.number().min(1).max(3).optional(),
  windowAcExists: z.boolean(),
  windowAcCount: z.coerce.number().min(1).max(3).optional(),
  storageRoom: z.boolean(),
  maidRoom: z.boolean(),
  electricityMeter: z
    .string()
    .min(3, 'يجب أن يتكون رقم العداد من 3 أرقام على الأقل')
    .max(14, 'رقم العداد يجب ألا يتجاوز 14 رقماً'),
  waterMeter: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

function selectClass(hasValue: boolean) {
  return `w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-right focus:border-[#14723d] focus:outline-none focus:ring-1 focus:ring-[#14723d] ${
    hasValue ? 'text-slate-900' : 'text-slate-400'
  }`;
}

const COUNT_FEATURES = [
  {
    exists: 'kitchenExists' as const,
    count: 'kitchenCount' as const,
    label: 'يوجد مطبخ',
    countLabel: 'عدد المطابخ',
  },
  {
    exists: 'livingRoomExists' as const,
    count: 'livingRoomCount' as const,
    label: 'يوجد صالة',
    countLabel: 'عدد الصالات',
  },
  {
    exists: 'receptionRoomExists' as const,
    count: 'receptionRoomCount' as const,
    label: 'يوجد مجلس',
    countLabel: 'عدد المجالس',
  },
  {
    exists: 'splitAcExists' as const,
    count: 'splitAcCount' as const,
    label: 'يوجد مكيفات سبلت راكبة',
    countLabel: 'عدد مكيفات السبلت الراكبة',
  },
  {
    exists: 'windowAcExists' as const,
    count: 'windowAcCount' as const,
    label: 'يوجد مكيفات شباك راكبة',
    countLabel: 'عدد مكيفات الشباك الراكبة',
  },
];

export function Step4Unit({
  state,
  onBack,
  onSuccess,
}: {
  state: LeaseFormState;
  onBack: () => void;
  onSuccess: (leaseId: string) => void;
}) {
  const createLease = useCreateLease();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema) as any,
    defaultValues: {
      unitType: (state.unitType as any) || '',
      unitNumber: state.unitNumber || '',
      floor: (state.floor as any) || '',
      areaSqMeters:
        state.areaSqMeters === '' ? undefined : Number(state.areaSqMeters),
      bedrooms: (state.bedrooms as any) || '',
      bathrooms: (state.bathrooms as any) || '',
      kitchenExists: state.kitchen.exists,
      kitchenCount: state.kitchen.count ?? 1,
      livingRoomExists: state.livingRoom.exists,
      livingRoomCount: state.livingRoom.count ?? 1,
      receptionRoomExists: state.receptionRoom.exists,
      receptionRoomCount: state.receptionRoom.count ?? 1,
      splitAcExists: state.splitAc.exists,
      splitAcCount: state.splitAc.count ?? 1,
      windowAcExists: state.windowAc.exists,
      windowAcCount: state.windowAc.count ?? 1,
      storageRoom: state.storageRoom,
      maidRoom: state.maidRoom,
      electricityMeter: state.electricityMeter || '',
      waterMeter: state.waterMeter || '',
    },
  });

  const unitType = useWatch({ control, name: 'unitType' });
  const floor = useWatch({ control, name: 'floor' });
  const bedrooms = useWatch({ control, name: 'bedrooms' });
  const bathrooms = useWatch({ control, name: 'bathrooms' });

  const kitchenExists = useWatch({ control, name: 'kitchenExists' });
  const livingRoomExists = useWatch({ control, name: 'livingRoomExists' });
  const receptionRoomExists = useWatch({
    control,
    name: 'receptionRoomExists',
  });
  const splitAcExists = useWatch({ control, name: 'splitAcExists' });
  const windowAcExists = useWatch({ control, name: 'windowAcExists' });

  const existsMap = {
    kitchenExists,
    livingRoomExists,
    receptionRoomExists,
    splitAcExists,
    windowAcExists,
  };

  const onSubmit = handleSubmit(async (values) => {
    if (!state.clientId) return;

    const merged: LeaseFormState = {
      ...state,
      unitType: values.unitType,
      unitNumber: values.unitNumber,
      floor: values.floor,
      areaSqMeters: values.areaSqMeters,
      bedrooms: values.bedrooms,
      bathrooms: values.bathrooms,
      kitchen: {
        exists: values.kitchenExists,
        count: values.kitchenExists ? (values.kitchenCount ?? 1) : undefined,
      },
      livingRoom: {
        exists: values.livingRoomExists,
        count: values.livingRoomExists
          ? (values.livingRoomCount ?? 1)
          : undefined,
      },
      receptionRoom: {
        exists: values.receptionRoomExists,
        count: values.receptionRoomExists
          ? (values.receptionRoomCount ?? 1)
          : undefined,
      },
      splitAc: {
        exists: values.splitAcExists,
        count: values.splitAcExists ? (values.splitAcCount ?? 1) : undefined,
      },
      windowAc: {
        exists: values.windowAcExists,
        count: values.windowAcExists ? (values.windowAcCount ?? 1) : undefined,
      },
      storageRoom: values.storageRoom,
      maidRoom: values.maidRoom,
      electricityMeter: values.electricityMeter,
      waterMeter: values.waterMeter ?? '',
    };

    const input = mapToCreateLeaseInput(merged);
    const lease = await createLease.mutateAsync({
      clientId: state.clientId,
      input,
    });
    onSuccess(lease.id);
  });

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <h2 className="text-center text-lg font-semibold text-slate-800">
        بيانات الوحدة
      </h2>

      <div>
        <label className="block text-sm text-slate-600 mb-1">نوع الوحدة</label>
        <select
          className={selectClass(!!unitType)}
          {...register('unitType')}
          defaultValue=""
        >
          <option value="" disabled className="text-slate-400">
            اختر نوع الوحدة
          </option>
          <option value="APARTMENT" className="text-slate-900">
            شقة
          </option>
          <option value="FLOOR" className="text-slate-900">
            دور
          </option>
          <option value="DRIVER_ROOM" className="text-slate-900">
            غرفة سائق
          </option>
          <option value="VILLA" className="text-slate-900">
            فيلا
          </option>
        </select>
        {errors.unitType && (
          <p className="text-sm text-red-600">{errors.unitType.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm text-slate-600 mb-1">رقم الوحدة</label>
        <input
          placeholder="أدخل رقم الوحدة"
          className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-right placeholder:text-right placeholder:text-slate-400 focus:border-[#14723d] focus:outline-none focus:ring-1 focus:ring-[#14723d]"
          {...register('unitNumber')}
        />
        {errors.unitNumber && (
          <p className="text-sm text-red-600">{errors.unitNumber.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm text-slate-600 mb-1">الدور</label>
        <select
          className={selectClass(!!floor)}
          {...register('floor')}
          defaultValue=""
        >
          <option value="" disabled className="text-slate-400">
            اختر الدور
          </option>
          <option value="GROUND" className="text-slate-900">
            الأرضي
          </option>
          {Array.from({ length: 9 }, (_, i) => (
            <option
              key={i + 1}
              value={`FLOOR_${i + 1}`}
              className="text-slate-900"
            >
              {i + 1}
            </option>
          ))}
          <option value="FLOOR_10_PLUS" className="text-slate-900">
            10+
          </option>
        </select>
        {errors.floor && (
          <p className="text-sm text-red-600">{errors.floor.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm text-slate-600 mb-1">
          المساحة (م²)
        </label>
        <input
          type="number"
          placeholder="أدخل المساحة بالمتر المربع"
          className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-right placeholder:text-right placeholder:text-slate-400 focus:border-[#14723d] focus:outline-none focus:ring-1 focus:ring-[#14723d]"
          {...register('areaSqMeters')}
        />
        {errors.areaSqMeters && (
          <p className="text-sm text-red-600">{errors.areaSqMeters.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm text-slate-600 mb-1">
          عدد غرف النوم
        </label>
        <select
          className={selectClass(!!bedrooms)}
          {...register('bedrooms')}
          defaultValue=""
        >
          <option value="" disabled className="text-slate-400">
            اختر عدد الغرف
          </option>
          {[1, 2, 3, 4].map((n) => (
            <option key={n} value={n} className="text-slate-900">
              {n}
            </option>
          ))}
        </select>
        {errors.bedrooms && (
          <p className="text-sm text-red-600">{errors.bedrooms.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm text-slate-600 mb-1">
          عدد الحمامات
        </label>
        <select
          className={selectClass(!!bathrooms)}
          {...register('bathrooms')}
          defaultValue=""
        >
          <option value="" disabled className="text-slate-400">
            اختر عدد الحمامات
          </option>
          {[1, 2, 3, 4].map((n) => (
            <option key={n} value={n} className="text-slate-900">
              {n}
            </option>
          ))}
        </select>
        {errors.bathrooms && (
          <p className="text-sm text-red-600">{errors.bathrooms.message}</p>
        )}
      </div>

      {/* معلومات إضافية */}
      <div className="space-y-3 rounded-2xl border border-slate-200 p-4 text-right">
        <div className="font-medium text-slate-700">معلومات إضافية</div>

        {COUNT_FEATURES.map(({ exists, count, label, countLabel }) => {
          const on = existsMap[exists];
          return (
            <div
              key={exists}
              className="flex items-center justify-between gap-3"
            >
              <label className="flex cursor-pointer items-center gap-2.5">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 accent-[#14723d]"
                  checked={!!on}
                  onChange={(e) => {
                    setValue(exists, e.target.checked);
                    setValue(count, e.target.checked ? 1 : undefined);
                  }}
                />
                <span className="text-sm text-slate-800">
                  {on ? countLabel : label}
                </span>
              </label>

              {on ? (
                <select
                  className="w-20 rounded-lg border border-slate-200 px-2 py-1.5 text-sm text-right text-slate-900 focus:border-[#14723d] focus:outline-none focus:ring-1 focus:ring-[#14723d]"
                  {...register(count)}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </select>
              ) : (
                <span className="w-20" />
              )}
            </div>
          );
        })}

        <label className="flex cursor-pointer items-center gap-2.5">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-slate-300 accent-[#14723d]"
            {...register('storageRoom')}
          />
          <span className="text-sm text-slate-800">يوجد غرفة مخزن</span>
        </label>

        <label className="flex cursor-pointer items-center gap-2.5">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-slate-300 accent-[#14723d]"
            {...register('maidRoom')}
          />
          <span className="text-sm text-slate-800">يوجد غرفة خادمة</span>
        </label>

        <div>
          <label className="block text-sm text-slate-600 mb-1">
            رقم عداد الكهرباء
          </label>
          <input
            dir="ltr"
            placeholder="3xxxxxxxx"
            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-right text-sm placeholder:text-right placeholder:text-slate-400 focus:border-[#14723d] focus:outline-none focus:ring-1 focus:ring-[#14723d]"
            maxLength={14}
            {...register('electricityMeter')}
          />
          {errors.electricityMeter && (
            <p className="text-sm text-red-600">
              {errors.electricityMeter.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm text-slate-600 mb-1">
            رقم عداد المياه
          </label>
          <input
            dir="ltr"
            placeholder="اختياري"
            className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-right text-sm placeholder:text-right placeholder:text-slate-400 focus:border-[#14723d] focus:outline-none focus:ring-1 focus:ring-[#14723d]"
            {...register('waterMeter')}
          />
        </div>
      </div>

      {createLease.isError && (
        <p className="text-sm text-red-600">
          تعذر إرسال الطلب. تحقق من الـ API والبيانات.
        </p>
      )}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 rounded-xl border border-slate-200 py-2.5 hover:bg-slate-50 transition-colors"
        >
          رجوع
        </button>
        <button
          type="submit"
          disabled={createLease.isPending}
          className="flex-1 rounded-xl bg-[#ba2931] hover:bg-[#9a2128] transition-colors py-2.5 text-white disabled:opacity-60"
        >
          {createLease.isPending ? 'جاري الإرسال...' : 'إرسال الطلب'}
        </button>
      </div>
    </form>
  );
}
