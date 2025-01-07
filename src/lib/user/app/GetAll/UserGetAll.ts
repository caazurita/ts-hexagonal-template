import { RoleRepository } from "../../../role/domain/RolRepository";
import { UserRepository } from "../../domain/UserRepository";
import { UserDTO } from "../UserDto";

export class UserGetAll {
  constructor(
    private repository: UserRepository,
    // private roleRepository: RoleRepository
  ) {}

  async run(): Promise<UserDTO[]> {
    const user = await this.repository.getAll();
    return user.map((user) => {
      // const roleId = 1;
      // const role = await this.roleRepository.getOneById(roleId);
      return {
        id: user.getId(),
        name: user.name.getValue(),
        email: user.email.getValue(),
        // role: {
        //   id: role?.id,
        //   name: role?.name,
        // },
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    });
  }
}
