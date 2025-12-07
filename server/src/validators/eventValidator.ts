import { z } from 'zod';

export const createEventSchema = z.object({
  title: z.string().min(1),
  startTimeUTC: z.iso.datetime(),
});

export const getEventsQuerySchema = z
  .object({
    date: z.iso.date().optional(),
    timezone: z.string().optional(),
  })
  .refine((data) => !(data.date && !data.timezone), {
    message: 'timezone is required when date is provided',
    path: ['timezone'], // points the error at 'tiemzone'
  });

export const deleteEventSchema = z.object({
  id: z.uuid(),
});

export type CreateEventInput = z.infer<typeof createEventSchema>;

export type GetEventsQueryInput = z.infer<typeof getEventsQuerySchema>;

export type DeleteEventsInput = z.infer<typeof deleteEventSchema>;
