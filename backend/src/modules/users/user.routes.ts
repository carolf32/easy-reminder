import { Router } from "express";
import { container } from "tsyringe";
import { UserController } from "./user.controller";

const userRouter = Router();
const userController = container.resolve(UserController);

userRouter.post("/login", (req, res) => userController.login(req, res));
userRouter.post("/register", (req, res) => userController.register(req, res));

export default userRouter;
