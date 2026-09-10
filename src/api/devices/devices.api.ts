import {
  deviceListResponseSchema,
  type DeviceListFilters,
} from '@/types/devices.types';
import { apiClient } from '../client';

export const devicesApi = {
  async getAll(filters: DeviceListFilters = {}, signal?: AbortSignal) {
    const response = await apiClient<unknown>('/devices', {
      signal,
      params: {
        page: filters.page ?? 1,
        limit: filters.limit ?? 20,
        ...(filters.installationId && {
          installationId: filters.installationId,
        }),
        ...(filters.sectorId && { sectorId: filters.sectorId }),
        ...(filters.companyId && { companyId: filters.companyId }),
      },
    });

    return deviceListResponseSchema.parse(response);
  },
};
