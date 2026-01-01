import { CreateEventDTO, Event } from '@event-scheduler/shared';

// will let the errors bubble up for caller to handle
// todo wont work for prod
const API_BASE_URL = 'http://localhost:3000/api';

// todo is there a better way of doing this since i dont like casting it like   return response.json() as Promise<T>;

async function fetchJSON<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);
  // Catch errors at the boundary, not the utility (try / catch SHOULD live (caller side))
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.json() as Promise<T>;
}

// DELETE typically returns no body (204 status): so we need to ignore this or response.json() will fail.
async function fetchNoContent(
  url: string,
  options?: RequestInit
): Promise<void> {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
}

export async function fetchEvents(
  date?: string,
  timezone?: string
): Promise<Event[]> {
  const params = new URLSearchParams();

  if (date) params.append('date', date);
  if (timezone) params.append('timezone', timezone);

  const queryString = params.toString(); // "date=2025-01-15&timezone=America/Los_Angeles"
  const url = `${API_BASE_URL}/events${queryString ? `?${queryString}` : ''}`;

  return fetchJSON<Event[]>(url);
}

export async function createEvent(data: CreateEventDTO): Promise<Event> {
  const response = await fetchJSON<Event>(`${API_BASE_URL}/events`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return response;
}

export async function deleteEvent(id: string): Promise<void> {
  await fetchNoContent(`${API_BASE_URL}/events/${id}`, {
    method: 'DELETE',
  });
}
