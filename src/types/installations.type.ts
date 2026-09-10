import { z } from "zod";

export const installationSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  zipcode: z.string(),
});

export const createInstallationSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  zipcode: z.string().min(1),
});

export type Installation = z.infer<typeof installationSchema>;

export type CreateInstallation = z.infer<typeof createInstallationSchema>;
