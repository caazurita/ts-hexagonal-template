import AppDataSource from "../../../data-source";
import { Role } from "../../domain/Role";
import { RoleRepository } from "../../domain/RolRepository";
import { RoleEntity } from "./roleEntity";

export class OrmRoleRepository implements RoleRepository {
  async getOneById(id: number): Promise<Role | null> {
    const role = await AppDataSource.getRepository(RoleEntity).findOneBy({
      id,
    });
    if (!role) return null;
    return new Role(
      role.id,
      role.name,
      role.description,
      role.createdAt,
      role.updatedAt
    );
  }
}
