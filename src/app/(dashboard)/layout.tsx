import { ReactNode } from 'react';
import DashboardSidebar from './_components/dashboard-sidebar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <DashboardSidebar />
      <main className="p-6 flex-1">{children}</main>
    </div>
  );
}
