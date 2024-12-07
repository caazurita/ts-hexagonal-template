import { hash, compare, hashSync } from "bcryptjs";

import { PasswordEncryptor } from "../domain/PasswordEncryptor";
export class PasswordHasherAdapter implements PasswordEncryptor {
  async encrypt(password: string): Promise<string> {
    const hashedPassword = await hash(password, 10);
    return hashedPassword;
  }

  async compare(password: string, encryptedPassword: string): Promise<boolean> {
    const isValid = await compare(password, encryptedPassword);
    return isValid;
  }
}
