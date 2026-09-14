import { devicesApi } from '@/api/devices/devices.api';
import type { DeviceListFilters } from '@/types/devices.types';
import { useQuery } from '@tanstack/react-query';
import { useInstallation } from '@/components/providers/installation-provider';

export function useDevices(filters: Omit<DeviceListFilters, 'installationId'> = {}) {
  const { installationId } = useInstallation();
  const scopedFilters = { ...filters, installationId };
  return useQuery({
    queryKey: ['devices', scopedFilters],
    queryFn: ({ signal }) => installationId ? devicesApi.getAll(scopedFilters, signal) : Promise.reject(new Error('Selecione uma instalação')),
    enabled: Boolean(installationId),
    refetchInterval: 15_000,
    refetchIntervalInBackground: false,
  });
}
