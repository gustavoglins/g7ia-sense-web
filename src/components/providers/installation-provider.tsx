'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import { useInstallations } from '@/hooks/useInstallations';

const InstallationContext = createContext<{
  installationId: string;
  selectInstallation: (id: string) => void;
  installations: ReturnType<typeof useInstallations>;
} | null>(null);

export function InstallationProvider({ children }: { children: ReactNode }) {
  const installations = useInstallations();
  const [selectedId, setSelectedId] = useState('');
  const available = installations.data ?? [];
  const installationId = available.find(({ id }) => id === selectedId)?.id
    ?? available[0]?.id ?? '';

  return (
    <InstallationContext.Provider value={{
      installationId,
      installations,
      selectInstallation: (id) => {
        if (available.some((installation) => installation.id === id)) setSelectedId(id);
      },
    }}>
      {children}
    </InstallationContext.Provider>
  );
}

export function useInstallation() {
  const context = useContext(InstallationContext);
  if (!context) throw new Error('useInstallation requires InstallationProvider');
  return context;
}
