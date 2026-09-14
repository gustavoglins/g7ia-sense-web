import { ReactNode } from 'react';
import DashboardSidebar from './_components/dashboard-sidebar';
import { InstallationProvider } from '@/components/providers/installation-provider';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <InstallationProvider>
      <div className="flex h-dvh overflow-hidden">
        <DashboardSidebar />
        <main className="min-w-0 flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </InstallationProvider>
  );
}
