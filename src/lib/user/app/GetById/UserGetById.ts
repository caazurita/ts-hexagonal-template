import { UserNotFoundError } from "../../domain/errors/UserNotFoundError";
import { UserRepository } from "../../domain/UserRepository";
import { UserId } from "../../domain/valueObjects/UserId";
import { UserDTO } from "../UserDto";

export class UserGetById {
  constructor(private repository: UserRepository) {}

  async run(id: number): Promise<UserDTO> {
    const user = await this.repository.getOneById(new UserId(id));
    if (!user) {
      throw new UserNotFoundError("User not found.");
    }
    return {
      id: user.id.getValue(),
      name: user.name.getValue(),
      email: user.email.getValue(),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
