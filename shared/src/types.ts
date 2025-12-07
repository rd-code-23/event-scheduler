export interface Event {
    id: string;
    title: string;
    startTimeUTC: string;
    createdAt: string;
}

export interface CreateEventDTO {
    title: string;
    startTimeUTC: string;
}

export interface GetEventsQuery {
    date: string;
    timezone: string;
}