import { z } from 'zod';

export const sectorSchema = z.object({
  id: z.uuid(),
  installationId: z.uuid(),
  name: z.string(),
  description: z.string().nullable(),
  status: z.enum(['active', 'inactive']),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Sector = z.infer<typeof sectorSchema>;
