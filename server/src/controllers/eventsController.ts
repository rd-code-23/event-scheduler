import { Request, Response } from "express";
import { GetEventsQueryInput, getEventsQuerySchema, CreateEventInput, createEventSchema, deleteEventSchema, DeleteEventsInput } from "../validators/eventValidator";
import * as eventService from "../services/eventService";

export function getEvents(req: Request<{}, {}, GetEventsQueryInput>, res: Response) {
    const { date, timezone } = req.query;

    const result = getEventsQuerySchema.safeParse({ date, timezone });

    if (result.error) {
        return res.status(400).json({ error: result.error.message });
    }

    if (result.success && result.data.date && result.data.timezone) {
        const filteredEvents = eventService.getEventsByLocalDate(result.data.date, result.data.timezone)
        return res.status(200).json(filteredEvents);
    }

    return res.status(200).json(eventService.getAllEvents())
};

export function createEvent(req: Request<{}, {}, CreateEventInput>, res: Response) {
    const { title, startTimeUTC } = req.body;

    const result = createEventSchema.safeParse({ title, startTimeUTC });

    if (result.error) {
        return res.status(400).json({ error: result.error.message });
    }

    return res.status(201).json((eventService.createEvent(
        { title: result.data.title, startTimeUTC: result.data.startTimeUTC }
    )))
}

export function deleteEvent(req: Request<DeleteEventsInput, {}, {}>, res: Response) {
    const { id } = req.params; // DELETE requests typically use the URL: DELETE /api/events/:id   

    const result = deleteEventSchema.safeParse({ id });

    if (result.error) {
        return res.status(400).json({ error: result.error.message });
    }

    const deletedEvent = eventService.deleteEvent(
        id
    )

    if (!deletedEvent) {
        return res.status(404).json({ error: "Event not found" });
    }

    return res.status(204).send();
}
