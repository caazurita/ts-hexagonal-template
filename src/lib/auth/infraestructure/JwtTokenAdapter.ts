import "dotenv/config";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { JwtTokenManager } from "../domain/JwtTokenManager";

const JWT_SECRET = <string>process.env.JWT_SECRET;

export class JwtTokenAdapter implements JwtTokenManager {
  generateAccessToken(userId: string | number, expiresIn: string): string {
    const jwt = sign({ userId }, JWT_SECRET, {
      expiresIn,
    });
    return jwt;
  }

  verifyAccessToken(jwt: string): JwtPayload | string {
    const decoded = verify(jwt, JWT_SECRET);
    return decoded;
  }
}
