import { User } from "../../domain/User";
import { UserNotFoundError } from "../../domain/errors/UserNotFoundError";
import { UserRepository } from "../../domain/UserRepository";
import { Email } from "../../domain/valueObjects/Email";

type UserDTO = {
  id: string | number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export class UserGetByEmail {
  constructor(private repository: UserRepository) {}

  async run(email: string): Promise<UserDTO> {
    const user = await this.repository.getOneByEmail(new Email(email));
    if (!user) {
      throw new UserNotFoundError("User not found.");
    }
    return {
        id: user.id.getValue(),
        name: user.name.getValue(),
        email: user.email.getValue(),
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    }
  }
}
