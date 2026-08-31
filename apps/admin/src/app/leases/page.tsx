'use client';

import Link from 'next/link';
import { useLeases } from '@lease-app/data-access';

export default function LeasesPage() {
  const { data, isLoading, isError, error } = useLeases();

  if (isLoading) return <p>جاري التحميل...</p>;
  if (isError) {
    return (
      <p className="text-red-600">
        تعذر تحميل العقود: {(error as Error)?.message ?? 'خطأ غير معروف'}
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">العقود</h1>

      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100 text-right">
            <tr>
              <th className="px-3 py-2">الوحدة</th>
              <th className="px-3 py-2">جوال المالك</th>
              <th className="px-3 py-2">الإيجار السنوي</th>
              <th className="px-3 py-2">بداية العقد</th>
              <th className="px-3 py-2">تاريخ الإنشاء</th>
              <th className="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {(data ?? []).map((lease) => (
              <tr key={lease.id} className="border-t">
                <td className="px-3 py-2">{lease.unitNumber}</td>
                <td className="px-3 py-2 dir-ltr text-left">
                  {lease.ownerMobile}
                </td>
                <td className="px-3 py-2">{lease.annualRent}</td>
                <td className="px-3 py-2">
                  {lease.contractStartDate?.slice?.(0, 10) ??
                    lease.contractStartDate}
                </td>
                <td className="px-3 py-2">
                  {lease.createdAt?.slice?.(0, 10) ?? lease.createdAt}
                </td>
                <td className="px-3 py-2">
                  <Link
                    href={`/leases/${lease.id}`}
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
                  colSpan={6}
                  className="px-3 py-6 text-center text-slate-500"
                >
                  لا توجد عقود بعد
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
