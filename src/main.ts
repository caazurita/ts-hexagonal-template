import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import { userRouter } from "./lib/user/infrastructure/ExpressUserRoute";
import { authRouter } from "./lib/auth/infraestructure/ExpressUserRoute";
import AppDataSource from "./lib/data-source";

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });

const app = express();
app.use(express.json());
app.use(userRouter);
app.use(authRouter);

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    res.status(500).json({
      message: err.message,
    });
  } else {
    res.status(500).send("Something broke!");
  }
});

app.listen("3000", () => {
  console.log(`Server running on http://localhost:3000`);
});
