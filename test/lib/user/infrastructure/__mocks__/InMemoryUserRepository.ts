import { User } from "../../../../../src/lib/user/domain/User";
import { UserRepository } from "../../../../../src/lib/user/domain/UserRepository";
import { Email } from "../../../../../src/lib/user/domain/valueObjects/Email";
import { UserId } from "../../../../../src/lib/user/domain/valueObjects/UserId";

export class InMemoryUserRepository implements UserRepository {
  constructor(private users: User[] = []) {}

  async getAll(): Promise<User[]> {
    return this.users;
  }

  async getOneById(id: UserId): Promise<User | null> {
    return this.users.find((user) => user.getId() === id.getValue()) || null;
  }

  async getOneByEmail(email: Email): Promise<User | null> {
    return (
      this.users.find((user) => user.email.getValue() === email.getValue()) ||
      null
    );
  }
  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  async update(user: User): Promise<void> {
    this.users = this.users.map((u) => (u.getId() === user.getId() ? user : u));
  }

  async delete(id: UserId): Promise<void> {
    this.users = this.users.filter((user) => user.getId() !== id.getValue());
  }
}
