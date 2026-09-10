import { devicesApi } from '@/api/devices/devices.api';
import type { DeviceListFilters } from '@/types/devices.types';
import { useQuery } from '@tanstack/react-query';

export function useDevices(filters: DeviceListFilters = {}) {
  return useQuery({
    queryKey: ['devices', filters],
    queryFn: ({ signal }) => devicesApi.getAll(filters, signal),
    refetchInterval: 15_000,
    refetchIntervalInBackground: false,
  });
}
