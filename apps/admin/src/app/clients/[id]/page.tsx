'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useClient, useLeasesByClient } from '@lease-app/data-access';

export default function ClientDetailPage() {
  const params = useParams<{ id: string }>();
  const clientQuery = useClient(params.id);
  const leasesQuery = useLeasesByClient(params.id);

  if (clientQuery.isLoading) return <p>جاري التحميل...</p>;
  if (clientQuery.isError || !clientQuery.data) {
    return <p className="text-red-600">تعذر تحميل العميل</p>;
  }

  const client = clientQuery.data;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold">تفاصيل العميل</h1>
        <Link href="/clients" className="text-sm text-teal-700 hover:underline">
          رجوع للقائمة
        </Link>
      </div>

      <div className="grid gap-3 rounded-lg border bg-white p-4 text-sm md:grid-cols-2">
        <div>
          <div className="text-xs text-slate-500">المعرف</div>
          <div className="font-medium">{client.id}</div>
        </div>
        <div>
          <div className="text-xs text-slate-500">واتساب</div>
          <div className="font-medium dir-ltr text-left">
            {client.whatsappNumber}
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-500">موثق</div>
          <div className="font-medium">{client.isVerified ? 'نعم' : 'لا'}</div>
        </div>
        <div>
          <div className="text-xs text-slate-500">تاريخ الإنشاء</div>
          <div className="font-medium">
            {String(client.createdAt).slice(0, 10)}
          </div>
        </div>
      </div>

      <section className="space-y-2">
        <h2 className="font-semibold">عقود هذا العميل</h2>
        {leasesQuery.isLoading && <p>جاري تحميل العقود...</p>}
        {leasesQuery.isError && (
          <p className="text-red-600">تعذر تحميل العقود</p>
        )}
        <ul className="divide-y rounded-lg border bg-white">
          {(leasesQuery.data ?? []).map((lease) => (
            <li
              key={lease.id}
              className="flex items-center justify-between px-3 py-2 text-sm"
            >
              <span>
                {lease.unitNumber} — {lease.annualRent}
              </span>
              <Link
                href={`/leases/${lease.id}`}
                className="text-teal-700 hover:underline"
              >
                عرض
              </Link>
            </li>
          ))}
          {!leasesQuery.data?.length && !leasesQuery.isLoading && (
            <li className="px-3 py-4 text-center text-slate-500">
              لا توجد عقود
            </li>
          )}
        </ul>
      </section>
    </div>
  );
}
