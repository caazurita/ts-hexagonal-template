import { NextFunction, Request, Response } from "express";
import { UserNotFoundError } from "../domain/errors/UserNotFoundError";
import { UserCreate } from "../app/Create/UserCreate";
import { PasswordHasherAdapter } from "./PasswordHasherAdapter";
import { UserGetAll } from "../app/GetAll/UserGetAll";
import { UserGetById } from "../app/GetById/UserGetById";
import { UserUpdate } from "../app/Update/UserUpdate";

import { ServiceContainer } from "../../serviceContainer/infratructure/ServiceContainer";
import {
  CreateValidator,
  getOneByIdValidator,
  UpdateValidator,
} from "./UserValidator";
import { validate } from "class-validator";

const repository = ServiceContainer.ormUserRepository;
const roleRepository = ServiceContainer.ormRoleRepository;

export class ExpressUserController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const service = new UserGetAll(repository, roleRepository);
      const users = await service.run();
      res.json(users).status(200);
    } catch (e) {
      next(e);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const validator = new getOneByIdValidator();
      validator.id = id;
      const validationErrors = await validate(validator);
      if (validationErrors.length > 0) {
        res.status(400).json({ message: validationErrors });
      }
      const service = new UserGetById(repository);
      const user = await service.run(parseInt(id, 10));
      res.json(user).status(200);
    } catch (error) {
      if (error instanceof UserNotFoundError) {
        res.status(404).json({ message: error.message });
      }
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      // se puede anadir validaciones de infraestructura con Joi
      const { id, name, email, password } = req.body;

      const validator = new CreateValidator();
      validator.name = name;
      validator.email = email;
      validator.password = password;
      const validationErrors = await validate(validator);

      if (validationErrors.length > 0) {
        res.status(400).json({ message: validationErrors });
      } else {
        const passwordEncryptor = new PasswordHasherAdapter();
        const service = new UserCreate(repository, passwordEncryptor);
        const user = await service.run(id, name, email, password);
        res.json(user).status(201);
      }
    } catch (e) {
      next(e);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      //se puede anadir validaciones de infraestructura con Joi
      const { id } = req.params;
      const idNumber = parseInt(id);
      const { name, email, password } = req.body;
      const passwordEncryptor = new PasswordHasherAdapter();

      const validator = new UpdateValidator();
      validator.name = name;
      validator.email = email;
      validator.password = password;
      const validationErrors = await validate(validator);
      if (validationErrors.length > 0) {
        res.status(400).json({ message: validationErrors });
      } else {
        const service = new UserUpdate(repository, passwordEncryptor);
        const user = await service.run(idNumber, name, email, password);
        res.json(user).status(200);
      }
    } catch (e) {
      if (e instanceof UserNotFoundError) {
        res.status(404).json({ message: e.message });
      } else {
        next(e);
      }
    }
  }

  // async delete(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     // se puede anadir validaciones de infraestructura con Joi
  //     const { id } = req.params;

  //     await ServiceContainer.user.delete.run(id);
  //     res.status(204).send();
  //   } catch (e) {
  //     next(e);
  //   }
  // }
}
