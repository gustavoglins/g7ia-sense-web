import { Device } from '@/types/devices.types';
import { apiClient } from '../client';

export const devicesApi = {
  getAll() {
    return apiClient<Device[]>('/devices');
  },
};
