import { fromZonedTime } from "date-fns-tz";

// Task 2.4: Create Date Utilities (Backend)
// File: /server/src/utils/dateUtils.ts

//  Implement getUTCRangeForLocalDate(localDate, timezone) 
//          — returns typed { start: Date, end: Date }

//  Implement isWithinLocalDate(utcTimestamp, localDate, timezone) 
//          — returns boolean
//  Add proper type annotations to all functions


//  think about what "January 15 in Los Angeles" means in UTC terms.
export function getUTCRangeForLocalDate(localDate: string, timezone: string): { start: Date, end: Date } {
    const startLocal = `${localDate}T00:00:00`;
    const endLocal = `${localDate}T23:59:59.999`;

    return {
        start: fromZonedTime(startLocal, timezone),
        end: fromZonedTime(endLocal, timezone)
    };
}


// Checks if a UTC timestamp falls on a specific local date in a given timezone.
export function isWithinLocalDate(utcTimestamp: string, localDate: string, timezone: string): boolean {
    const { start, end } = getUTCRangeForLocalDate(localDate, timezone);
    const timestamp = new Date(utcTimestamp);
    return timestamp >= start && timestamp <= end;
}



// isWithinLocalDate('2025-01-16T07:00:00Z', '2025-01-15', 'America/Los_Angeles')
// // → true (that UTC time is 11 PM on Jan 15 in LA)

// isWithinLocalDate('2025-01-16T08:00:00Z', '2025-01-15', 'America/Los_Angeles')
// // → false (that UTC time is midnight Jan 16 in LA)