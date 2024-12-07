import { Email } from "./valueObjects/Email";
import { Name } from "./valueObjects/Name";
import { UserId } from "./valueObjects/UserId";
import { Password } from "./valueObjects/Password";

export class User {
  id: UserId;
  name: Name;
  email: Email;
  password: Password;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: UserId,
    name: Name,
    email: Email,
    password: Password,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  getId() {
    return this.id.getValue();
  }
  mapToPrimitive() {
    return {
      id: this.id.getValue(),
      name: this.name.getValue(),
      email: this.email.getValue(),
      password: this.password.getValue(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
