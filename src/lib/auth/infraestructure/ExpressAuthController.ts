import { NextFunction, Request, Response } from "express";

import { AuthSignIn } from "../app/AuthSignIn";
import { JwtTokenAdapter } from "./JwtTokenAdapter";

import { ServiceContainer } from "../../serviceContainer/infratructure/ServiceContainer";
const repository = ServiceContainer.ormUserRepository;

export class ExpressAuthController {
  async sigIn(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const service = new AuthSignIn(repository, new JwtTokenAdapter());
      const auth = await service.run(email, password);
      res
        .cookie("refreshToken", auth.refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .json(auth)
        .status(200);
    } catch (error) {
      next(error);
    }
  }
}
