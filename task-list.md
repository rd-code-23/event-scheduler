# Event Scheduler Project - Task List (TypeScript)

## Project Overview
Build a full-stack event scheduler that correctly handles timezones. Users create events in their local time, data is stored as UTC, and displayed back in the user's timezone.

**Tech Stack:**
- Frontend: React + TypeScript + Vite
- Backend: Node.js + Express + TypeScript
- Validation: Zod
- Dates: date-fns + date-fns-tz
- Database: In-memory (upgrade to PostgreSQL later)

---

## Phase 1: Project Setup

### Task 1.1: Initialize Backend
- [ ] Create new folder `event-scheduler`
- [ ] Initialize Node.js project: `npm init -y`
- [ ] Install dependencies: `express`, `cors`, `zod`, `date-fns`, `date-fns-tz`
- [ ] Install dev dependencies: `typescript`, `ts-node`, `nodemon`, `@types/express`, `@types/cors`, `@types/node`
- [ ] Initialize TypeScript: `npx tsc --init`
- [ ] Configure `tsconfig.json` (strict mode, ES2020, commonjs)
- [ ] Create folder structure:
  ```
  /server
    /src
      /routes
        events.ts
      /controllers
        eventsController.ts
      /services
        eventService.ts
      /db
        events.ts
      /types
        index.ts
      /validators
        eventValidator.ts
      /utils
        dateUtils.ts
      index.ts
    tsconfig.json
    package.json
  ```
- [ ] Set up Express server with JSON parsing and CORS
- [ ] Add dev script using nodemon + ts-node

### Task 1.2: Initialize Frontend
- [ ] Create React app with Vite: `npm create vite@latest client -- --template react-ts`
- [ ] Install dependencies: `date-fns`, `date-fns-tz`, `zod`
- [ ] Create folder structure:
  ```
  /client/src
    /components
      EventForm.tsx
      EventList.tsx
      EventCard.tsx
      DateSelector.tsx
      TimezoneSelector.tsx
      WarningBanner.tsx
      Modal.tsx
    /hooks
      useEvents.ts
      useTimezone.ts
    /utils
      dateUtils.ts
      api.ts
    /types
      index.ts
    /validators
      eventValidator.ts
    App.tsx
  ```

---

## Phase 2: Backend Core

### Task 2.1: Create Type Definitions
**File:** `/server/src/types/index.ts`
- [ ] Define `Event` interface (id, title, startTimeUTC, createdAt)
- [ ] Define `CreateEventDTO` interface
- [ ] Define `GetEventsQuery` interface (date, timezone)
- [ ] Export all types

### Task 2.2: Create Event Validator (Zod)
**File:** `/server/src/validators/eventValidator.ts`
- [ ] Define schema for creating an event (title, startTimeUTC as datetime)
- [ ] Define schema for query params (date, timezone — timezone required if date provided)
- [ ] Export inferred types from schemas using `z.infer<>`
- [ ] Test with valid and invalid inputs

### Task 2.3: Create In-Memory Database
**File:** `/server/src/db/events.ts`
- [ ] Create typed array to store events
- [ ] Export functions: `getAll()`, `getById(id)`, `create(event)`, `delete(id)`
- [ ] Ensure all functions have proper TypeScript return types

### Task 2.4: Create Date Utilities (Backend)
**File:** `/server/src/utils/dateUtils.ts`
- [ ] Implement `getUTCRangeForLocalDate(localDate, timezone)` — returns typed `{ start: Date, end: Date }`
- [ ] Implement `isWithinLocalDate(utcTimestamp, localDate, timezone)` — returns boolean
- [ ] Add proper type annotations to all functions

### Task 2.5: Create Event Service
**File:** `/server/src/services/eventService.ts`
- [ ] Implement `getAllEvents()` — returns `Event[]`
- [ ] Implement `getEventsByLocalDate(date, timezone)` — returns `Event[]`
- [ ] Implement `createEvent(data)` — returns `Event`
- [ ] Implement `deleteEvent(id)` — returns `boolean`

### Task 2.6: Build Events Controller
**File:** `/server/src/controllers/eventsController.ts`
- [ ] Type the request and response objects properly
- [ ] Implement `getEvents` — validate query, return filtered or all events
- [ ] Implement `createEvent` — validate body with Zod, return 201 with event
- [ ] Implement `deleteEvent` — return 204 or 404
- [ ] Handle Zod validation errors (return 400 with typed error response)

### Task 2.7: Set Up Routes
**File:** `/server/src/routes/events.ts`
- [ ] `GET /api/events` — all events
- [ ] `GET /api/events?date=2025-01-15&tz=America/Los_Angeles` — filtered
- [ ] `POST /api/events` — create event
- [ ] `DELETE /api/events/:id` — delete event

### Task 2.8: Test Backend with cURL/Postman
- [ ] Create an event with ISO string
- [ ] Fetch all events
- [ ] Fetch events filtered by date and timezone
- [ ] Delete an event
- [ ] Test validation errors (missing title, invalid date format)

---

## Phase 3: Frontend Utilities

### Task 3.1: Create Type Definitions
**File:** `/client/src/types/index.ts`
- [ ] Define `Event` interface (match backend)
- [ ] Define `CreateEventRequest` interface
- [ ] Define `LocalDateParts` interface (date, time, display)
- [ ] Define `TimezoneInfo` interface (detected, saved, mismatch)
- [ ] Export all types

### Task 3.2: Build Date Utility Functions
**File:** `/client/src/utils/dateUtils.ts`

Implement with proper TypeScript types:

- [ ] `localToUTC(date, time, timezone): string`
  - Input: "2025-01-15", "09:00", "America/Los_Angeles"
  - Output: "2025-01-15T17:00:00.000Z"

- [ ] `utcToLocal(isoString, timezone): LocalDateParts`
  - Input: "2025-01-15T17:00:00.000Z", "America/Los_Angeles"
  - Output: { date, time, display }

- [ ] `formatForDisplay(isoString, timezone): string`
  - Human-readable format for event cards

- [ ] `isValidISOString(str): boolean`
  - Type guard for valid ISO strings

- [ ] `getUserTimezone(): string`
  - Returns IANA timezone from browser

- [ ] `getLocalToday(timezone): string`
  - Returns today's date as YYYY-MM-DD in given timezone

### Task 3.3: Build API Utility
**File:** `/client/src/utils/api.ts`
- [ ] `fetchEvents(date?, timezone?): Promise<Event[]>`
- [ ] `createEvent(data): Promise<Event>`
- [ ] `deleteEvent(id): Promise<void>`
- [ ] Add proper error handling with typed errors
- [ ] Use generics if appropriate for response handling

### Task 3.4: Build Frontend Validator
**File:** `/client/src/validators/eventValidator.ts`
- [ ] Define Zod schema for form data (title, date, time)
- [ ] Export inferred type using `z.infer<>`
- [ ] Create validation function that returns typed result with errors

---

## Phase 4: Frontend Hooks

### Task 4.1: useTimezone Hook
**File:** `/client/src/hooks/useTimezone.ts`
- [ ] Define return type interface
- [ ] Detect user's timezone on mount
- [ ] Store user's preferred timezone in localStorage
- [ ] Compare detected vs stored, return mismatch boolean
- [ ] Provide typed setter function to update preference

### Task 4.2: useEvents Hook
**File:** `/client/src/hooks/useEvents.ts`
- [ ] Define return type interface (events, loading, error, addEvent, removeEvent, refetch)
- [ ] Fetch events on mount and when date/timezone changes
- [ ] Type the async functions properly
- [ ] Handle loading and error states with proper types

---

## Phase 5: Frontend Components

### Task 5.1: Modal Component
- [ ] Define props interface (isOpen, onClose, title, children)
- [ ] Implement with overlay, close on escape, close on backdrop click

### Task 5.2: TimezoneSelector Component
- [ ] Define props interface (value, onChange)
- [ ] Dropdown with common IANA timezones
- [ ] Type the onChange handler properly

### Task 5.3: DateSelector Component
- [ ] Define props interface (value, onChange, timezone)
- [ ] Date display card + date input
- [ ] "Today" button functionality

### Task 5.4: EventForm Component
- [ ] Define props interface (onSubmit, onCancel, timezone)
- [ ] Form state with proper types
- [ ] On input change: validate, update UTC preview
- [ ] On submit:
  1. Validate with Zod
  2. Convert to UTC using `localToUTC()`
  3. Call onSubmit with typed data
- [ ] Show validation errors inline
- [ ] Show UTC preview

### Task 5.5: EventCard Component
- [ ] Define props interface (event, timezone, onDelete)
- [ ] Convert UTC to local using `utcToLocal()`
- [ ] Display local time + title
- [ ] Show "Stored as: [UTC]" for learning
- [ ] Delete button with typed handler

### Task 5.6: EventList Component
- [ ] Define props interface (events, timezone, loading, onDelete)
- [ ] Loading state
- [ ] Empty state
- [ ] Map events to EventCard (sorted by time)

### Task 5.7: WarningBanner Component
- [ ] Define props interface (detected, saved, onUpdate)
- [ ] Show mismatch message
- [ ] Update button

### Task 5.8: App Component - Wire It All Together
- [ ] Use useTimezone hook
- [ ] State for selected date (typed)
- [ ] Use useEvents hook with date and timezone
- [ ] State for modal open/close
- [ ] Render all components
- [ ] Show WarningBanner if mismatch

---

## Phase 6: The Hard Part — Date Filtering

### Task 6.1: Backend Date Filtering
**Challenge:** "Show events for January 15 in Los Angeles"

January 15 in LA (PST) = Jan 15 00:00 to Jan 15 23:59 local
In UTC = Jan 15 08:00 to Jan 16 07:59 UTC

- [ ] Implement `getUTCRangeForLocalDate` with proper types
- [ ] Use in service to filter events
- [ ] Test with different timezones

### Task 6.2: Frontend Date Filtering
- [ ] When user selects date, pass local date + timezone to API
- [ ] Display returned events
- [ ] Verify events appear on correct day

---

## Phase 7: Edge Cases & Polish

### Task 7.1: Handle Edge Cases
- [ ] Event created at 11:30 PM — shows on correct day?
- [ ] User in different timezone views same event — shows their local time?
- [ ] Invalid date input — shows typed error?
- [ ] Empty title — blocked by validation?

### Task 7.2: Add Loading States
- [ ] Show spinner while fetching events
- [ ] Disable submit button while creating event

### Task 7.3: Add Error Handling
- [ ] Type your error states properly
- [ ] Show validation errors inline in form
- [ ] Show API error message to user

### Task 7.4: Type Safety Verification
- [ ] No `any` types in codebase
- [ ] All API responses properly typed
- [ ] All component props have interfaces
- [ ] Zod schemas match TypeScript types

---

## Phase 8: Verification Checklist

### The Acid Test
- [ ] Create event at 11 PM in LA (PST)
- [ ] Check network tab — sent as next day in UTC?
- [ ] Switch to New York timezone — shows 2 AM next day?
- [ ] Filter by LA date — event appears on correct day?
- [ ] Filter by NY date — event appears on next day?

### Console Logging (for learning)
Add temporary logs to verify the flow:
- [ ] Log local input: "User entered: 2025-01-15 23:00 in America/Los_Angeles"
- [ ] Log UTC conversion: "Converted to UTC: 2025-01-16T07:00:00.000Z"
- [ ] Log display conversion: "Displaying as: Jan 15 at 11:00 PM (America/Los_Angeles)"

---

## Stretch Goals (Optional)

- [ ] Add PostgreSQL with TIMESTAMPTZ instead of in-memory array
- [ ] Add unit tests for date utility functions (both frontend and backend)
- [ ] Deploy frontend to Vercel, backend to Railway
- [ ] Add event editing functionality
- [ ] Add recurring events (advanced)

---

## Recommended Order

1. Backend setup + TypeScript config (Task 1.1)
2. Backend types (Task 2.1)
3. Backend validators (Task 2.2)
4. Backend db + service + controller + routes (Task 2.3–2.7)
5. Test backend with Postman (Task 2.8)
6. Frontend setup (Task 1.2)
7. Frontend types (Task 3.1)
8. Frontend date utilities (Task 3.2) ← **Most important**
9. Frontend API + validators (Task 3.3, 3.4)
10. Frontend hooks (Task 4.1, 4.2)
11. Frontend components (Task 5.1–5.8)
12. Date filtering (Task 6.1, 6.2)
13. Edge cases + type safety check (Task 7.1–7.4)
14. Verification (Task 8)

Good luck! 🚀