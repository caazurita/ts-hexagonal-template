import { UserGetAll } from "../../../../../src/lib/user/app/GetAll/UserGetAll";
import { InMemoryUserRepository } from "../../infrastructure/__mocks__/InMemoryUserRepository";

describe("UserGetAll should", () => {
  test("return all users", async () => {
    const repository = new InMemoryUserRepository()
    const service = new UserGetAll(repository);
    // Act
    const users = await service.run();
    // Assert
    expect(users).toHaveLength(0);
  });
});
