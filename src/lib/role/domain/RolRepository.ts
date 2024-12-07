import { Role } from "./Role";

export interface RoleRepository {
  getOneById(id: number): Promise<Role | null>;
}
