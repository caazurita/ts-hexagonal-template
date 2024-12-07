import { Router } from "express";
import { ExpressAuthController } from "./ExpressAuthController";

const controller = new ExpressAuthController();

const authRouter = Router();

authRouter.post("/auth/signin", controller.sigIn);


export { authRouter };
