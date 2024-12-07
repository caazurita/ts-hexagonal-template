import { PasswordEncryptor } from "../PasswordEncryptor";

export class Password {
  private readonly password: string;
  private hashedPassword: string;

  constructor(
    password: string,
    private readonly passwordEncryptor: PasswordEncryptor
  ) {
    this.password = password;
    this.ensurePasswordIsValid(this.password);

    this.hashedPassword = "";
    this.passwordEncryptor = passwordEncryptor;
  }

  getValue(): string {
    return this.hashedPassword;
  }

  async encrypt(): Promise<void> {
    this.hashedPassword = await this.passwordEncryptor.encrypt(this.password);
  }

  async compare(password: string): Promise<boolean> {
    const isValid = await this.passwordEncryptor.compare(
      password,
      this.hashedPassword
    );
    return isValid;
  }
  private ensurePasswordIsValid(password: string): void {
    if (password.length < 5) {
      throw new Error("Password must be at least 5 characters long.");
    }
  }
}
