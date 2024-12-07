import { Pool } from "pg";
import { UserRepository } from "../domain/UserRepository";
import { User } from "../domain/User";
import { Id } from "../domain/valueObjects/UserId";
import { Password } from "../domain/valueObjects/Password";

type postgresUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  created_at: Date;
  updated_at: Date;
};

export class PostgresUserRepository implements UserRepository {
  client: Pool;

  constructor(dataBaseUrl: string) {
    this.client = new Pool({
      connectionString: dataBaseUrl,
    });
  }

  private mapToDomain(row: postgresUser): User {
    return new User(
      new Id(row.id),
      row.name,
      row.email,
      new Password(row.password),
      row.role,
      new Date(row.created_at),
      new Date(row.updated_at)
    );
  }

  async create(user: User): Promise<void> {
    const query =
      "INSERT INTO users (id, name, email, password, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7)";

    await this.client.query(query, [
      user.id.getValue(),
      user.name.getValue(),
      user.email.getValue(),
      user.password.getValue(),
      user.createdAt,
      user.updatedAt,
    ]);
  }

  async getAll(): Promise<User[]> {
    const query = "SELECT * FROM users";

    const res = await this.client.query<postgresUser>(query);

    return res.rows.map((row) => {
      return this.mapToDomain(row);
    });
  }

  async getOneById(id: Id): Promise<User | null> {
    const query = "SELECT * FROM users WHERE id = $1";

    const res = await this.client.query<postgresUser>(query, [id.getValue()]);

    if (res.rows.length === 0) {
      return null;
    }

    return this.mapToDomain(res.rows[0]);
  }

  async update(user: User): Promise<void> {
    const query =
      "UPDATE users SET name = $1, email = $2, password = $3, role = $4, updated_at = $5 WHERE id = $6";

    await this.client.query(query, [
      user.name,
      user.email,
      user.password.getValue(),
      user.updatedAt,
      user.id.getValue(),
    ]);
  }

  async delete(id: Id): Promise<void> {
    const query = "DELETE FROM users WHERE id = $1";
    await this.client.query(query, [id.getValue()]);
  }
}
