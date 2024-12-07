import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";
import { UserId } from "../../domain/valueObjects/UserId";
import { Password } from "../../domain/valueObjects/Password";
import { Name } from "../../domain/valueObjects/Name";
import { Email } from "../../domain/valueObjects/Email";
import { UserEmailDuplicated } from "../../domain/errors/UserEmailDuplicated";
import { PasswordEncryptor } from "../../domain/PasswordEncryptor";
import { UserDTO } from "../UserDto";

export class UserCreate {
  constructor(
    private repository: UserRepository,
    private passwordEncryptor: PasswordEncryptor
  ) {}

  async run(
    id: number,
    name: string,
    email: string,
    password: string
  ): Promise<UserDTO> {
    const userExists = await this.repository.getOneByEmail(new Email(email));
    if (userExists) {
      throw new UserEmailDuplicated("Email already exists");
    }

    const pass = new Password(password, this.passwordEncryptor);
    await pass.encrypt();

    const user = new User(
      new UserId(id),
      new Name(name),
      new Email(email),
      pass,
      new Date(),
      new Date()
    );
    await this.repository.create(user);
    return {
      id: user.id.getValue(),
      name: user.name.getValue(),
      email: user.email.getValue(),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
