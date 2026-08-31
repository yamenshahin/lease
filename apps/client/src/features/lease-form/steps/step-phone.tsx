'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateClient } from '@lease-app/data-access';

const schema = z.object({
  whatsappNumber: z
    .string()
    .regex(/^05\d{8}$/, 'رقم الجوال يجب أن يكون بصيغة 05xxxxxxxx'),
});

type FormValues = z.infer<typeof schema>;

export function StepPhone({
  defaultWhatsapp,
  onSuccess,
}: {
  defaultWhatsapp: string;
  onSuccess: (clientId: string, whatsappNumber: string) => void;
}) {
  const createClient = useCreateClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { whatsappNumber: defaultWhatsapp },
  });

  const onSubmit = handleSubmit(async (values) => {
    const client = await createClient.mutateAsync(values.whatsappNumber);
    onSuccess(client.id, values.whatsappNumber);
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h2 className="text-center text-lg font-semibold">معلومات أساسية</h2>

      <div>
        <label className="mb-1 block text-sm text-gray-600">
          جوال المالك أو ممثله
        </label>
        <input
          dir="ltr"
          className="w-full rounded-lg border px-3 py-2"
          placeholder="05xxxxxxxx"
          maxLength={10}
          {...register('whatsappNumber')}
        />
        {errors.whatsappNumber && (
          <p className="mt-1 text-sm text-red-600">
            {errors.whatsappNumber.message}
          </p>
        )}
      </div>

      {createClient.isError && (
        <p className="text-sm text-red-600">
          تعذر إنشاء العميل. تأكد من تشغيل الـ API.
        </p>
      )}

      <button
        type="submit"
        disabled={createClient.isPending}
        className="w-full rounded-lg bg-teal-700 py-2.5 font-medium text-white disabled:opacity-60"
      >
        {createClient.isPending ? 'جاري التحقق...' : 'متابعة'}
      </button>
    </form>
  );
}
