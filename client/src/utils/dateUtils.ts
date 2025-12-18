// 	• [] localToUTC(date, time, timezone): string
// 		○ Input: "2025-01-15", "09:00", "America/Los_Angeles"
// 		○ Output: "2025-01-15T17:00:00.000Z"
// 	• [] utcToLocal(isoString, timezone): LocalDateParts
// 		○ Input: "2025-01-15T17:00:00.000Z", "America/Los_Angeles"
// 		○ Output: { date, time, display }
// 	• [] formatForDisplay(isoString, timezone): string
// 		○ Human-readable format for event cards
// 	• [] isValidISOString(str): boolean
// 		○ Type guard for valid ISO strings
// 	• [] getUserTimezone(): string
// 		○ Returns IANA timezone from browser
// 	• [] getLocalToday(timezone): string
// Returns today's date as YYYY-MM-DD in given timezone
import { fromZonedTime, toZonedTime } from 'date-fns-tz';

import { format, formatDistanceToNow, parse } from 'date-fns';

export function localToUTC(date: string, time: string, timezone: string) {
  const dateWithTime = parse(`${date} ${time}`, 'yyyy-MM-dd HH:mm', new Date());
  return fromZonedTime(dateWithTime, timezone);
}

export function utcToLocal(isoString: string, timezone: string) {
  const zonedDate = toZonedTime(isoString, timezone);

  const date = format(zonedDate, 'yyyy-MM-dd');
  const time = format(zonedDate, 'HH:mm');

  return {
    date,
    time,
    display: formatForDisplay(isoString, timezone),
  };
}

export function formatForDisplay(isoString: string, timezone: string) {
  const zonedDate = toZonedTime(isoString, timezone);
  return formatDistanceToNow(zonedDate, { addSuffix: true });
}

export function isValidISOString(str: string): boolean {
  const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;
  if (!isoRegex.test(str)) return false;

  const date = new Date(str);
  return !isNaN(date.getTime());
}

export function getUserTimezone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function getLocalToday(timezone: string): string {
  const zonedDate = toZonedTime(new Date(), timezone);

  return format(zonedDate, 'yyyy-MM-dd');
}

console.log(getLocalToday('America/Vancouver'));

// Example 1: Valid ISO string
//console.log(isValidISOString("2024-12-16T14:30:00.000Z"))
// Output: true

// Example 2: Invalid ISO string
//console.log(isValidISOString("2024-12-16 14:30:00"))
// Output: false

//console.log(utcToLocal("2025-01-15T17:00:00.000Z", "America/Los_Angeles"))
