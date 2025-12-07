export interface LocalDateParts {
  date: string; // Raw date for forms/inputs
  time: string; // Raw time for forms/inputs
  display: string; // Formatted for showing to user
}

export interface TimezoneInfo {
  detected: string; //  is the timezone the browser automatically detects from the user's system.
  saved: string | null; // null if no saved preference yet
  mismatch: boolean; // true if detected ≠ saved (user might be traveling)
}
