import { UserNotFoundError } from "../../domain/errors/UserNotFoundError";
import { UserRepository } from "../../domain/UserRepository";
import { UserId } from "../../domain/valueObjects/UserId";
import { Password } from "../../domain/valueObjects/Password";
import { PasswordEncryptor } from "../../domain/PasswordEncryptor";
import { Name } from "../../domain/valueObjects/Name";
import { Email } from "../../domain/valueObjects/Email";
import { UserDTO } from "../UserDto";

export class UserUpdate {
  constructor(
    private repository: UserRepository,
    private passwordEncryptor: PasswordEncryptor
  ) {}

  async run(
    userId: number,
    name: string,
    email: string,
    password?: string,
  ): Promise<UserDTO> {
    const user = await this.repository.getOneById(new UserId(userId));

    if (!user) {
      throw new UserNotFoundError("User not found");
    }

    user.name = new Name(name);
    user.email = new Email(email);

    if (password) {
      user.password = new Password(password, this.passwordEncryptor);
      await user.password.encrypt();
    }

    await this.repository.update(user);

    return {
      id: user.id.getValue(),
      name: user.name.getValue(),
      email: user.email.getValue(),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
