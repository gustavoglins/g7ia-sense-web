import { z } from 'zod';

export const deviceTypeSchema = z.enum(['ac', 'dc', 'env', 'adv', 'act']);
export type DeviceType = z.infer<typeof deviceTypeSchema>;

const telemetryBaseSchema = z.object({
  id: z.uuid(),
  deviceId: z.uuid(),
  time: z.string(),
  createdAt: z.string(),
});
const measurement = z.string().nullable();

export const telemetryAcSchema = telemetryBaseSchema.extend({
  v1: measurement,
  a1: measurement,
  fp1: measurement,
  rssi: measurement,
});

export const telemetryDcSchema = telemetryBaseSchema.extend({
  vdc1: measurement,
  cc1: measurement,
  vdc2: measurement,
  cc2: measurement,
  vdc3: measurement,
  cc3: measurement,
  rssi: measurement,
});

export const telemetryEnvSchema = telemetryBaseSchema.extend({
  temp: measurement,
  humidity: measurement,
  solar: measurement,
  light: measurement,
  wind: measurement,
  h2: measurement,
  rssi: measurement,
});

const locationSchema = z.object({ id: z.uuid(), name: z.string() });
const deviceBaseSchema = z.object({
  id: z.uuid(),
  sectorId: z.uuid(),
  name: z.string(),
  serialNumber: z.string().nullable(),
  version: z.string().nullable(),
  macAddress: z.string().nullable(),
  status: z.enum(['active', 'inactive']),
  createdAt: z.string(),
  updatedAt: z.string(),
  sector: locationSchema,
  installation: locationSchema,
  apiKeys: z.object({ read: z.string(), write: z.string() }),
});

export const deviceSchema = z.discriminatedUnion('deviceType', [
  deviceBaseSchema.extend({
    deviceType: z.literal('ac'),
    latestTelemetry: telemetryAcSchema.nullable(),
  }),
  deviceBaseSchema.extend({
    deviceType: z.literal('dc'),
    latestTelemetry: telemetryDcSchema.nullable(),
  }),
  deviceBaseSchema.extend({
    deviceType: z.literal('env'),
    latestTelemetry: telemetryEnvSchema.nullable(),
  }),
  deviceBaseSchema.extend({
    deviceType: z.literal('adv'),
    latestTelemetry: z.null(),
  }),
  deviceBaseSchema.extend({
    deviceType: z.literal('act'),
    latestTelemetry: z.null(),
  }),
]);

export const deviceListResponseSchema = z.object({
  data: z.array(deviceSchema),
  pagination: z.object({
    page: z.number().int().positive(),
    limit: z.number().int().positive().max(100),
    total: z.number().int().nonnegative(),
    totalPages: z.number().int().nonnegative(),
  }),
});

export type Device = z.infer<typeof deviceSchema>;
export type DeviceListResponse = z.infer<typeof deviceListResponseSchema>;

export type DeviceListFilters = {
  installationId?: string;
  sectorId?: string;
  companyId?: string;
  page?: number;
  limit?: number;
};
