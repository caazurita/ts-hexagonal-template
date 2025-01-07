import { UserId } from "../../../../src/lib/user/domain/valueObjects/UserId";
import { User } from "../../../../src/lib/user/domain/User";
import { Name } from "../../../../src/lib/user/domain/valueObjects/Name";
import { Email } from "../../../../src/lib/user/domain/valueObjects/Email";
import { Password } from "../../../../src/lib/user/domain/valueObjects/Password";
import {
  randEmail,
  randFullName,
  randPassword,
  incrementalNumber,
} from "@ngneat/falso";

export class UserStub {
  public static create(): User {
    const factory = incrementalNumber();
    return new User(
      new UserId(factory()),
      new Name(randFullName()),
      new Email(randEmail()),
      new Password(randPassword()),
      new Date(),
      new Date()
    );
  }
}
