export class UserDTO {
  readonly id: string | number;
  readonly name: string;
  readonly email: string;
  readonly role?: {
    id: number | undefined;
    name: string | undefined;
  };
  readonly password?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;

  constructor(
    id: string | number,
    name: string,
    email: string,
    role?: { id: number | undefined; name: string | undefined },
    password?: string,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
