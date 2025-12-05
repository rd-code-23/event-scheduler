
/**
 * The service layer is a middle layer between your controller and database.
Right now it seems redundant because getAllEvents() just calls getAll(). 
But the service is where you'd add:
- Filtering logic (like filtering by date/timezone)
- Business rules
- Combining multiple db calls
- Data transformation

It keeps your controller thin (just handles HTTP stuff) and 
your db layer dumb (just CRUD).
For this project, eventService.getAllEvents() will just wrap the db call, 
but eventService.getEventsByLocalDate() will use your date utilities to 
filter — that logic belongs in the service, not the controller or db.
 * 
 * 
 */


import { getAllFromDB, deleteEventFromDB, createFromDB } from "../db/events";
import { CreateEventDTO, Event } from '../types/index'
import { isWithinLocalDate } from "../utils/dateUtils";

export function getAllEvents(): Event[] {
    return getAllFromDB()
}


// todo this function is specific to a single date. maybe look into a more general function that is flexible
export function getEventsByLocalDate(date: string, timezone: string): Event[] {
    const events = getAllFromDB()

    return events.filter(event => isWithinLocalDate(event.startTimeUTC, date, timezone))
}

export function createEvent(data: CreateEventDTO): Event {
    return createFromDB(data.title, data.startTimeUTC)
}

export function deleteEvent(id: string): boolean {
    return deleteEventFromDB(id)
}