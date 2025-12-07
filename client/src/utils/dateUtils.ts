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
