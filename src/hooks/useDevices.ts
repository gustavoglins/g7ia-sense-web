import { devicesApi } from '@/api/devices/devices.api';
import { useQuery } from '@tanstack/react-query';

export function useDevices() {
  return useQuery({
    queryKey: ['devices'],
    queryFn: devicesApi.getAll,
  });
}
