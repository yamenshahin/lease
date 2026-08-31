'use client';

import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateLease } from '@lease-app/data-access';
import { LeaseFormState } from '../lease-form.types';
import { mapToCreateLeaseInput } from '../map-to-create-lease-input';

const schema = z.object({
  unitType: z.enum(['APARTMENT', 'FLOOR', 'DRIVER_ROOM', 'VILLA']),
  unitNumber: z.string().min(1),
  floor: z.enum([
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
  ]),
  areaSqMeters: z.coerce.number().positive(),
  bedrooms: z.coerce.number().min(1).max(4),
  bathrooms: z.coerce.number().min(1).max(4),
  kitchenExists: z.boolean(),
  kitchenCount: z.coerce.number().min(1).max(4).optional(),
  livingRoomExists: z.boolean(),
  livingRoomCount: z.coerce.number().min(1).max(4).optional(),
  receptionRoomExists: z.boolean(),
  receptionRoomCount: z.coerce.number().min(1).max(4).optional(),
  splitAcExists: z.boolean(),
  splitAcCount: z.coerce.number().min(1).max(4).optional(),
  windowAcExists: z.boolean(),
  windowAcCount: z.coerce.number().min(1).max(4).optional(),
  storageRoom: z.boolean(),
  maidRoom: z.boolean(),
  electricityMeter: z.string().min(3).max(14),
  waterMeter: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

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
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      unitType: state.unitType,
      unitNumber: state.unitNumber,
      floor: state.floor,
      areaSqMeters:
        state.areaSqMeters === '' ? undefined : Number(state.areaSqMeters),
      bedrooms: state.bedrooms,
      bathrooms: state.bathrooms,
      kitchenExists: state.kitchen.exists,
      kitchenCount: state.kitchen.count,
      livingRoomExists: state.livingRoom.exists,
      livingRoomCount: state.livingRoom.count,
      receptionRoomExists: state.receptionRoom.exists,
      receptionRoomCount: state.receptionRoom.count,
      splitAcExists: state.splitAc.exists,
      splitAcCount: state.splitAc.count,
      windowAcExists: state.windowAc.exists,
      windowAcCount: state.windowAc.count,
      storageRoom: state.storageRoom,
      maidRoom: state.maidRoom,
      electricityMeter: state.electricityMeter,
      waterMeter: state.waterMeter,
    },
  });

  const kitchenExists = useWatch({ control, name: 'kitchenExists' });
  const livingRoomExists = useWatch({ control, name: 'livingRoomExists' });
  const receptionRoomExists = useWatch({
    control,
    name: 'receptionRoomExists',
  });
  const splitAcExists = useWatch({ control, name: 'splitAcExists' });
  const windowAcExists = useWatch({ control, name: 'windowAcExists' });

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
      kitchen: { exists: values.kitchenExists, count: values.kitchenCount },
      livingRoom: {
        exists: values.livingRoomExists,
        count: values.livingRoomCount,
      },
      receptionRoom: {
        exists: values.receptionRoomExists,
        count: values.receptionRoomCount,
      },
      splitAc: { exists: values.splitAcExists, count: values.splitAcCount },
      windowAc: { exists: values.windowAcExists, count: values.windowAcCount },
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
      <h2 className="text-center text-lg font-semibold">بيانات الوحدة</h2>

      <select
        className="w-full rounded-lg border px-3 py-2"
        {...register('unitType')}
      >
        <option value="APARTMENT">شقة</option>
        <option value="FLOOR">دور</option>
        <option value="DRIVER_ROOM">غرفة سائق</option>
        <option value="VILLA">فيلا</option>
      </select>

      <input
        placeholder="رقم الوحدة"
        className="w-full rounded-lg border px-3 py-2"
        {...register('unitNumber')}
      />

      <select
        className="w-full rounded-lg border px-3 py-2"
        {...register('floor')}
      >
        <option value="GROUND">الأرضي</option>
        {Array.from({ length: 9 }, (_, i) => (
          <option key={i + 1} value={`FLOOR_${i + 1}`}>
            {i + 1}
          </option>
        ))}
        <option value="FLOOR_10_PLUS">10+</option>
      </select>

      <input
        type="number"
        placeholder="المساحة م²"
        className="w-full rounded-lg border px-3 py-2"
        {...register('areaSqMeters')}
      />
      <input
        type="number"
        placeholder="غرف النوم"
        min={1}
        max={4}
        className="w-full rounded-lg border px-3 py-2"
        {...register('bedrooms')}
      />
      <input
        type="number"
        placeholder="الحمامات"
        min={1}
        max={4}
        className="w-full rounded-lg border px-3 py-2"
        {...register('bathrooms')}
      />

      <label className="flex items-center gap-2">
        <input type="checkbox" {...register('kitchenExists')} /> يوجد مطبخ
      </label>
      {kitchenExists && (
        <input
          type="number"
          min={1}
          max={4}
          className="w-full rounded-lg border px-3 py-2"
          {...register('kitchenCount')}
        />
      )}

      <label className="flex items-center gap-2">
        <input type="checkbox" {...register('livingRoomExists')} /> يوجد صالة
      </label>
      {livingRoomExists && (
        <input
          type="number"
          min={1}
          max={4}
          className="w-full rounded-lg border px-3 py-2"
          {...register('livingRoomCount')}
        />
      )}

      <label className="flex items-center gap-2">
        <input type="checkbox" {...register('receptionRoomExists')} /> يوجد مجلس
      </label>
      {receptionRoomExists && (
        <input
          type="number"
          min={1}
          max={4}
          className="w-full rounded-lg border px-3 py-2"
          {...register('receptionRoomCount')}
        />
      )}

      <label className="flex items-center gap-2">
        <input type="checkbox" {...register('splitAcExists')} /> مكيفات سبلت
      </label>
      {splitAcExists && (
        <input
          type="number"
          min={1}
          max={4}
          className="w-full rounded-lg border px-3 py-2"
          {...register('splitAcCount')}
        />
      )}

      <label className="flex items-center gap-2">
        <input type="checkbox" {...register('windowAcExists')} /> مكيفات شباك
      </label>
      {windowAcExists && (
        <input
          type="number"
          min={1}
          max={4}
          className="w-full rounded-lg border px-3 py-2"
          {...register('windowAcCount')}
        />
      )}

      <label className="flex items-center gap-2">
        <input type="checkbox" {...register('storageRoom')} /> غرفة مخزن
      </label>
      <label className="flex items-center gap-2">
        <input type="checkbox" {...register('maidRoom')} /> غرفة خادمة
      </label>

      <input
        dir="ltr"
        placeholder="رقم عداد الكهرباء"
        className="w-full rounded-lg border px-3 py-2"
        maxLength={14}
        {...register('electricityMeter')}
      />
      {errors.electricityMeter && (
        <p className="text-sm text-red-600">
          {errors.electricityMeter.message}
        </p>
      )}

      <input
        dir="ltr"
        placeholder="رقم عداد المياه (اختياري)"
        className="w-full rounded-lg border px-3 py-2"
        {...register('waterMeter')}
      />

      {createLease.isError && (
        <p className="text-sm text-red-600">
          تعذر إرسال الطلب. تحقق من الـ API والبيانات.
        </p>
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
          disabled={createLease.isPending}
          className="flex-1 rounded-lg bg-teal-700 py-2 text-white disabled:opacity-60"
        >
          {createLease.isPending ? 'جاري الإرسال...' : 'إرسال الطلب'}
        </button>
      </div>
    </form>
  );
}
