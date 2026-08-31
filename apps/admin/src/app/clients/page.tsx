'use client';

import Link from 'next/link';
import { useClients } from '@lease-app/data-access';

export default function ClientsPage() {
  const { data, isLoading, isError, error } = useClients();

  if (isLoading) return <p>جاري التحميل...</p>;
  if (isError) {
    return (
      <p className="text-red-600">
        تعذر تحميل العملاء: {(error as Error)?.message ?? 'خطأ غير معروف'}
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">العملاء</h1>

      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100 text-right">
            <tr>
              <th className="px-3 py-2">الجوال</th>
              <th className="px-3 py-2">موثق</th>
              <th className="px-3 py-2">تاريخ الإنشاء</th>
              <th className="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {(data ?? []).map((c) => (
              <tr key={c.id} className="border-t">
                <td className="px-3 py-2 dir-ltr text-left">
                  {c.whatsappNumber}
                </td>
                <td className="px-3 py-2">{c.isVerified ? 'نعم' : 'لا'}</td>
                <td className="px-3 py-2">
                  {c.createdAt?.slice?.(0, 10) ?? c.createdAt}
                </td>
                <td className="px-3 py-2">
                  <Link
                    href={`/clients/${c.id}`}
                    className="text-teal-700 hover:underline"
                  >
                    عرض
                  </Link>
                </td>
              </tr>
            ))}
            {!data?.length && (
              <tr>
                <td
                  colSpan={4}
                  className="px-3 py-6 text-center text-slate-500"
                >
                  لا يوجد عملاء بعد
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
