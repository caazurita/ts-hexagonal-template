import AppDataSource from "../../../../lib/data-source";
import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";
import { UserEntity } from "./userEntity";
import { UserId } from "../../domain/valueObjects/UserId";
import { Name } from "../../domain/valueObjects/Name";
import { Email } from "../../domain/valueObjects/Email";
import { Password } from "../../domain/valueObjects/Password";
import { PasswordHasherAdapter } from "../PasswordHasherAdapter";

export class OrmUserRepository implements UserRepository {
  async getAll(): Promise<User[]> {
    const users = await AppDataSource.manager.find(UserEntity);
    return users.map((user) => {
      return new User(
        new UserId(user.id),
        new Name(user.name),
        new Email(user.email),
        new Password(user.password, new PasswordHasherAdapter()),
        user.createdAt,
        user.updatedAt
      );
    });
  }

  async getOneById(id: UserId): Promise<User | null> {
    const user = await AppDataSource.manager.findOneBy(UserEntity, {
      id: id.getValue(),
    });
    if (!user) {
      return null;
    }
    return new User(
      new UserId(user.id),
      new Name(user.name),
      new Email(user.email),
      new Password(user.password, new PasswordHasherAdapter()),
      user.createdAt,
      user.updatedAt
    );
  }
  async create(_user: User): Promise<void> {
    await AppDataSource.manager.save(UserEntity, {
      name: _user.name.getValue(),
      email: _user.email.getValue(),
      password: _user.password.getValue(),

    });
  }

  async update(user: User): Promise<void> {
    const updateUser: Partial<UserEntity> = {
      name: user.name.getValue(),
      email: user.email.getValue(),
    };

    if (user.password.getValue()) {
      updateUser.password = user.password.getValue();
    }

    await AppDataSource.manager.update(
      UserEntity,
      user.id.getValue(),
      updateUser
    );
  }

  async getOneByEmail(email: Email): Promise<User | null> {
    const user = await AppDataSource.manager.findOneBy(UserEntity, {
      email: email.getValue(),
    });
    if (!user) {
      return null;
    }
    return new User(
      new UserId(user.id),
      new Name(user.name),
      new Email(user.email),
      new Password(user.password, new PasswordHasherAdapter()),
      user.createdAt,
      user.updatedAt
    );
  }

  async delete(id: UserId): Promise<void> {
    await AppDataSource.manager.delete(UserEntity, id.getValue());
  }
}
