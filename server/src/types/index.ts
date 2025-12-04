export interface Event {
    id: string; // UUIDs are better than numbers for IDs 
    title: string;
    startTimeUTC: string; //  storing ISO strings like "2025-01-15T17:00:00.000Z", not Date objects
    createdAt: string;
}

/**
DTO = Data Transfer Object
It's just a fancy name for "the shape of data being sent between systems."
In this case, CreateEventDTO defines what the client sends to your API when creating an event.
It's not the full Event (no id, no createdAt — the server adds those).

No userId yet — keep it simple for now (no users yet).
 */
export interface CreateEventDTO {
    title: string;
    // The client converts local time to UTC before sending. 
    // So by the time the request hits your server, the timezone conversion is already done.
    startTimeUTC: string;
}

export interface GetEventsQuery {
    date: string;
    timezone: string;
}