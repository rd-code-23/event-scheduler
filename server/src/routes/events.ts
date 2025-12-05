import { Router } from "express";
import { createEvent, getEvents, deleteEvent } from "../controllers/eventsController";

const router = Router();

router.get("/events", getEvents);
router.post("/events", createEvent);
router.delete("/events/:id", deleteEvent);

export default router;
