export interface PasswordEncryptor {
  encrypt(password: string): Promise<string>;
  compare(password: string, encryptedPassword: string): Promise<boolean>;
}
