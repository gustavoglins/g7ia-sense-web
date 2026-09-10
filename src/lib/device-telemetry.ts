import type { Device } from '@/types/devices.types';

type Measurement = { label: string; value: string | null };

// Preserve the strings sent by the device; the API does not define units.
export function getDeviceMeasurements(device: Device): Measurement[] {
  switch (device.deviceType) {
    case 'ac': {
      const reading = device.latestTelemetry;
      return reading
        ? [
            { label: 'V', value: reading.v1 },
            { label: 'C', value: reading.a1 },
            { label: 'FP', value: reading.fp1 },
            { label: 'RSSI', value: reading.rssi },
          ]
        : [];
    }
    case 'dc': {
      const reading = device.latestTelemetry;
      return reading
        ? [
            { label: 'V', value: reading.vdc1 },
            { label: 'C', value: reading.cc1 },
            { label: 'V2', value: reading.vdc2 },
            { label: 'C2', value: reading.cc2 },
            { label: 'V3', value: reading.vdc3 },
            { label: 'C3', value: reading.cc3 },
            { label: 'RSSI', value: reading.rssi },
          ]
        : [];
    }
    case 'env': {
      const reading = device.latestTelemetry;
      return reading
        ? [
            { label: 'T', value: reading.temp },
            { label: 'H', value: reading.humidity },
            { label: 'S', value: reading.solar },
            { label: 'L', value: reading.light },
            { label: 'W', value: reading.wind },
            { label: 'H2', value: reading.h2 },
            { label: 'RSSI', value: reading.rssi },
          ]
        : [];
    }
    default:
      return [];
  }
}

export function formatTelemetryTime(time: string): string {
  const date = new Date(time);
  if (Number.isNaN(date.getTime())) return 'Data não disponível';
  return date.toLocaleString('pt-BR');
}
