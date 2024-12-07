
export interface JwtTokenManager {
  generateAccessToken(userId: string | number, expiresIn: string): string;
  verifyAccessToken(jwt: string): any;
}
