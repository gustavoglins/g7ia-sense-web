import { sectorsApi } from '@/api/sectors/sectors.api';
import { useQuery } from '@tanstack/react-query';
import { useInstallation } from '@/components/providers/installation-provider';

export function useSectors() {
  const { installationId } = useInstallation();
  return useQuery({
    queryKey: ['sectors', { installationId }],
    queryFn: ({ signal }) => installationId ? sectorsApi.getAll(installationId, signal) : Promise.reject(new Error('Selecione uma instalação')),
    enabled: Boolean(installationId),
  });
}
