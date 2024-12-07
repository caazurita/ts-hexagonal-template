import { InMemoryUserRepository } from "../../user/infrastructure/InMemoryUserRepository";
import { OrmUserRepository } from "../../user/infrastructure/typeOrm/OrmUserRepository";
import { OrmRoleRepository } from "../../role/infrastructure/typeOrm/OrmRoleRepository";

export const ServiceContainer = {
  inMemoryUserRepository: new InMemoryUserRepository(),
  ormUserRepository: new OrmUserRepository(),
  ormRoleRepository: new OrmRoleRepository(),
};
