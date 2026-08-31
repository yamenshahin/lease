import { Providers } from './providers';
import { AdminNav } from '../components/admin-nav';
import './global.css'; // keep your existing styles import if different

export const metadata = {
  title: 'Lease Admin',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <Providers>
          <AdminNav />
          <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
