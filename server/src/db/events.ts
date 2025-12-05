import { Event } from '../types/index'


const events: Event[] = [];


export function getAllFromDB(): Event[] {
    return events
}

export function getByIdFromDB(id: string): Event | undefined {
    return events.find(event => id === event.id)
}

export function deleteEventFromDB(id: string): boolean {
    const indexToRemove = events.findIndex(event => event.id === id);
    if (indexToRemove === -1) return false;  
    events.splice(indexToRemove, 1);
    return true;
}

export function createFromDB(title: string, startTimeUTC: string): Event {
    const newEvent: Event = {
        id: crypto.randomUUID(), // todo add in notes
        title,
        startTimeUTC,
        createdAt: new Date().toISOString()
    }

    events.push(newEvent)

    return newEvent
}
