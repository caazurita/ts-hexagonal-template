import { Router } from "express";
import { ExpressUserController } from "./ExpressUserController";

const controller = new ExpressUserController();

const userRouter = Router();

userRouter.get("/users", controller.getAll),
userRouter.get("/users/:id", controller.getById),
userRouter.post("/users", controller.create),
userRouter.put("/users/:id", controller.update),
userRouter.delete("/users/:id", controller.update);

export { userRouter };
