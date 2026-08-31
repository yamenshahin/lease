'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useLease } from '@lease-app/data-access';

export default function LeaseDetailPage() {
  const params = useParams<{ id: string }>();
  const { data, isLoading, isError } = useLease(params.id);

  if (isLoading) return <p>جاري التحميل...</p>;
  if (isError || !data) return <p className="text-red-600">تعذر تحميل العقد</p>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold">تفاصيل العقد</h1>
        <Link href="/leases" className="text-sm text-teal-700 hover:underline">
          رجوع للقائمة
        </Link>
      </div>

      <div className="grid gap-3 rounded-lg border bg-white p-4 text-sm md:grid-cols-2">
        <Field label="المعرف" value={data.id} />
        <Field
          label="العميل"
          value={
            <Link
              href={`/clients/${data.clientId}`}
              className="text-teal-700 hover:underline"
            >
              {data.clientId}
            </Link>
          }
        />
        <Field label="جوال المالك" value={data.ownerMobile} />
        <Field label="هوية المالك" value={data.ownerId} />
        <Field label="رقم الصك" value={data.deedNumber} />
        <Field label="رقم الوحدة" value={data.unitNumber} />
        <Field label="نوع الوحدة" value={data.unitType} />
        <Field label="الإيجار السنوي" value={String(data.annualRent)} />
        <Field
          label="بداية العقد"
          value={String(data.contractStartDate).slice(0, 10)}
        />
        <Field label="مدة العقد" value={data.contractDuration} />
        <Field label="الدفع" value={data.paymentFrequency} />
        <Field label="نوع المستأجر" value={data.tenantType} />
        <Field label="عداد الكهرباء" value={data.electricityMeter} />
        <Field label="العنوان" value={data.location?.address ?? '—'} />
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs text-slate-500">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}
