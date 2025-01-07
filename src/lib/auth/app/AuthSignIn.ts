import { UserRepository } from "../../user/domain/UserRepository";
import { Email } from "../../user/domain/valueObjects/Email";
import { AuthDto } from "./AuthDto";
import { JwtTokenManager } from "../domain/JwtTokenManager";
import { AuthInvalidCredentialError } from "./AuthInvalidCredentialError";

export class AuthSignIn {
  constructor(
    private userRepository: UserRepository,
    private jwtTokenManager: JwtTokenManager
  ) {}
  async run(email: string, password: string): Promise<AuthDto> {
    const user = await this.userRepository.getOneByEmail(new Email(email));
    if (!user) throw new AuthInvalidCredentialError("Invalid credentials.");

    const isValid = await user.password.compare(password);
    if (!isValid) throw new AuthInvalidCredentialError("Invalid credentials.");

    const accessToken = this.jwtTokenManager.generateAccessToken(
      user.id.getValue(),
      "5m"
    );
    const refreshToken = this.jwtTokenManager.generateAccessToken(
      user.id.getValue(),
      "1d"
    );

    return {
      name: user.name.getValue(),
      email: user.email.getValue(),
      createdAt: user.createdAt,
      accessToken,
      refreshToken,
    };
  }
}
