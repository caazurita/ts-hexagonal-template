import { DataSource } from "typeorm";
import { UserEntity } from "./user/infrastructure/typeOrm/userEntity";
import { RoleEntity } from "./role/infrastructure/typeOrm/roleEntity";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "pitifully-direct-steenbok.data-1.use1.tembo.io",
  port: 5432,
  username: "postgres",
  password: "OGHBk6y402gur3aY",
  database: "postgres",
  ssl: { rejectUnauthorized: false },
  synchronize: true,
  entities: [UserEntity, RoleEntity],
});



export default AppDataSource;