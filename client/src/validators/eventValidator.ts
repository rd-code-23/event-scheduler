import { z } from 'zod';

export const eventFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format'),
  time: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format'),
});

export type EventFormData = z.infer<typeof eventFormSchema>;

// Date Regex: /^\d{4}-\d{2}-\d{2}$/
// ^           Start of string
// \d{4}       Exactly 4 digits (year: 2025)
// -           Literal dash
// \d{2}       Exactly 2 digits (month: 01)
// -           Literal dash
// \d{2}       Exactly 2 digits (day: 15)
// $           End of string
// Matches: "2025-01-15" ✅
// Rejects: "2025-1-5", "25-01-15", "2025/01/15" ❌

// Time Regex: /^\d{2}:\d{2}$/
// ^           Start of string
// \d{2}       Exactly 2 digits (hours: 09)
// :           Literal colon
// \d{2}       Exactly 2 digits (minutes: 30)
// $           End of string
// Matches: "09:30", "14:00" ✅
// Rejects: "9:30", "14:5", "14:00:00" ❌
// The ^ and $ ensure the entire string matches the pattern (no extra characters before/after).
