import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { validateMiddleware } from "../middlewares/validateMiddleware";
import { sosLocationSchema } from "./sos.schema";
import { container } from "tsyringe";
import { SOSController } from "./sos.controller";

const sosRoutes = Router();
const sosController = container.resolve(SOSController);

sosRoutes.use(authMiddleware);
sosRoutes.post("/trigger", validateMiddleware(sosLocationSchema), (req, res) =>
  sosController.triggerSOS(req, res)
);
sosRoutes.get("/history", (req, res) => sosController.getSOSHistory(req, res));

export default sosRoutes;
