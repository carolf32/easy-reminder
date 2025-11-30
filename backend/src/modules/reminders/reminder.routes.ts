import { Router } from "express";
import { ReminderController } from "./reminder.controller";
import { container } from "tsyringe";
import { authMiddleware } from "../middlewares/authMiddleware";
import { createReminderSchema } from "./reminder.schema";
import { validateMiddleware } from "../middlewares/validateMiddleware";

const reminderRouter = Router();
const reminderController = container.resolve(ReminderController);

reminderRouter.use(authMiddleware);

reminderRouter.post("/", validateMiddleware(createReminderSchema), (req, res) =>
  reminderController.createReminder(req, res)
);
reminderRouter.get("/", (req, res) =>
  reminderController.getReminders(req, res)
);
reminderRouter.get("/:id", (req, res) =>
  reminderController.getReminderById(req, res)
);
reminderRouter.delete("/:id", (req, res) =>
  reminderController.deleteReminder(req, res)
);

export default reminderRouter;
