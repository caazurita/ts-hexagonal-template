import { Auth } from "../domain/Auth";

export class AuthDto {
  readonly name: string;
  readonly email: string;
  readonly createdAt: Date;
  readonly accessToken: string;
  readonly refreshToken: string;

  constructor(name: string, email: string, createdAt: Date, auth: Auth) {
    this.name = name;
    this.email = email;
    this.createdAt = createdAt;
    this.accessToken = auth.accessToken;
    this.refreshToken = auth.refreshToken;
  }
}
