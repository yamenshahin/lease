'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/leases', label: 'العقود' },
  { href: '/clients', label: 'العملاء' },
];

export function AdminNav() {
  const pathname = usePathname();

  return (
    <header className="border-b bg-slate-900 text-white">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-3">
        <Link href="/leases" className="font-bold tracking-tight">
          Lease Admin
        </Link>
        <nav className="flex gap-4 text-sm">
          {links.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  active
                    ? 'text-teal-300 underline underline-offset-4'
                    : 'text-slate-200 hover:text-white'
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
