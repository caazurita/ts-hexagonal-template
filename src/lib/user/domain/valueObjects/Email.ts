export class Email {
  private readonly email: string;
  constructor(email: string) {
    this.ensureEmailIsValid(email);
    this.email = email;
  }
  getValue(): string {
    return this.email;
  }

  equals(email: Email): boolean {
    return this.email === email.getValue();
  }

  private ensureEmailIsValid(email: string): void {
    if (!email) {
      throw new Error("Email is required.");
    }
  }
}
