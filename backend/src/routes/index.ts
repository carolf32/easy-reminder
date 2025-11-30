import { Router } from "express";
import userRoutes from "../modules/users/user.routes";
import reminderRoutes from "../modules/reminders/reminder.routes";
import sosRoutes from "../modules/sos/sos.routes";

const router = Router();

router.use("/users", userRoutes);
router.use("/reminders", reminderRoutes);
router.use("/sos", sosRoutes);

export default router;
