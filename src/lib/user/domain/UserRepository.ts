import { User } from "./User";
import { Email } from "./valueObjects/Email";
import { UserId } from "./valueObjects/UserId";

export interface UserRepository {
  create(user: User): Promise<void>;
  getAll(): Promise<User[]>;
  getOneById(id: UserId): Promise<User | null> | null;
  getOneByEmail(email: Email): Promise<User | null> | null;
  update(user: User): Promise<void>;
  delete(id: UserId): Promise<void>;
}
