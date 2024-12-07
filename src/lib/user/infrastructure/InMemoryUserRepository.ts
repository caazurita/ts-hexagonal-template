import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";
import { Email } from "../domain/valueObjects/Email";
import { UserId } from "../domain/valueObjects/UserId";

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async create(user: User): Promise<void> {
    this.users.push(user);
  }

  async getAll(): Promise<User[]> {
    return this.users;
  }

  async getOneById(id: UserId): Promise<User | null> {
    const user = this.users.find((user) => user.id.equals(id));
    return user || null;
  }

  async getOneByEmail(email: Email): Promise<User | null> {
    const user = this.users.find((user) => user.email.equals(email));
    return user || null;
  }

  async update(user: User): Promise<void> {
    const index = this.users.findIndex((u) => u.id.equals(user.id));
    if (index !== -1) {
      this.users[index] = user;
    }
  }

  async delete(id: UserId): Promise<void> {
    this.users = this.users.filter((user) => !user.id.equals(id));
  }
}
