import { UserCreate } from "../../../../../src/lib/user/app/Create/UserCreate";
import { UserStub } from "../../domain/UserStub";
import { InMemoryUserRepository } from "../../infrastructure/__mocks__/InMemoryUserRepository";
import { PasswordHasherAdapter } from "../../infrastructure/__mocks__/PasswordHasherAdapter";

describe("UserCreate should", () => {
  test("create an user", async () => {
    // Arrange
    const repository = new InMemoryUserRepository();
    const passwordEncryptor = new PasswordHasherAdapter();
    const service = new UserCreate(repository, passwordEncryptor);
    const user = UserStub.create();
    
    
    await service.run(
      user.id.getValue(),
      user.name.getValue(),
      user.email.getValue(),
      user.password.getValue(),
    );
    // Act
    // Assert
  });
});
