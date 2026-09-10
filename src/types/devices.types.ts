import z from 'zod';

const deviceTypeSchema = z.enum(['ac', 'dc', 'env', 'adv', 'act']);

const deviceStatusSchema = z.enum(['active', 'inactive']);

export const deviceSchema = z.object({
  id: z.uuid(),
  sectorId: z.uuid(),

  name: z.string(),
  deviceType: deviceTypeSchema,
  serialNumber: z.string().nullable(),
  version: z.string().nullable(),
  macAddress: z.string().nullable(),

  status: deviceStatusSchema,

  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Device = z.infer<typeof deviceSchema>;
