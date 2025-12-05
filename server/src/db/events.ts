import { Event } from '../types/index'


const events: Event[] = [];


export function getAll(): Event[] {
    return events
}

export function getById(id: string): Event | undefined {
    return events.find(event => id === event.id)
}

export function deleteEvent(id: string): boolean {
    const indexToRemove = events.findIndex(event => event.id === id);

    events.splice(indexToRemove, 1)
    return true
}

export function create(title: string, startTimeUTC: string): Event {
    const newEvent: Event = {
        id: crypto.randomUUID(), // todo add in notes
        title,
        startTimeUTC,
        createdAt: new Date().toISOString()
    }

    events.push(newEvent)

    return newEvent
}
