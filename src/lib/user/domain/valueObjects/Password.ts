import { PasswordEncryptor } from "../PasswordEncryptor";

export class Password {
  private readonly password: string;
  private hashedPassword: string;

  constructor(
    password: string
    // private readonly passwordEncryptor: PasswordEncryptor
  ) {
    this.password = password;
    this.ensurePasswordIsValid(this.password);

    // this.hashedPassword = "";
    // this.passwordEncryptor = passwordEncryptor;
  }

  getValue(): string {
    return this.hashedPassword;
  }

  private ensurePasswordIsValid(password: string): void {
    if (password.length < 5) {
      throw new Error("Password must be at least 5 characters long.");
    }
  }

  async encrypt(passwordEncryptor: PasswordEncryptor): Promise<Password> {
    this.hashedPassword = await passwordEncryptor.encrypt(this.password);
    return this;
  }

  async compare(
    passwordEncryptor: PasswordEncryptor,
    password: string
  ): Promise<boolean> {
    const isValid = await passwordEncryptor.compare(
      password,
      this.hashedPassword
    );
    return isValid;
  }
}
