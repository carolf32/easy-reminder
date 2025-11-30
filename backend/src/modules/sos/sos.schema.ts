import { z } from "zod";

export const sosLocationSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

export const sosEventSchema = z.object({
  id: z.string(),
  name: z.string(),
  emergencyContactName: z.string().optional().nullable(),
  emergencyContactPhone: z.string().optional().nullable(),
});

export type TSOSLocationData = z.infer<typeof sosLocationSchema>;
export type TSOSEventData = z.infer<typeof sosEventSchema>;
