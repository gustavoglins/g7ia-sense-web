import { sectorsApi } from '@/api/sectors/sectors.api';
import { useQuery } from '@tanstack/react-query';

export function useSectors(installationId: string) {
  return useQuery({
    queryKey: ['sectors', { installationId }],
    queryFn: ({ signal }) => sectorsApi.getAll(installationId, signal),
    enabled: Boolean(installationId),
  });
}
