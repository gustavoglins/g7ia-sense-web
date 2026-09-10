import { sectorSchema } from '@/types/sectors.types';
import { apiClient } from '../client';

export const sectorsApi = {
  async getAll(installationId: string, signal?: AbortSignal) {
    const response = await apiClient<unknown>('/sectors', {
      signal,
      params: { installationId },
    });

    return sectorSchema.array().parse(response);
  },
};
