import { Inject, Injectable } from "@nestjs/common";
import { NotFoundError } from "src/app/errors/not-found-error";
import { UnauthorizedError } from "src/app/errors/unauthorized-error";
import { ISignInService, SignInParams, SignInResponse } from "src/app/interfaces/auth/sign-in-service.interface";
import { ICreateRefreshTokenService, ICreateRefreshTokenServiceToken } from "src/app/interfaces/refresh-token/create-refresh-token-service.interface";
import { IHashComparer, IHashComparerToken } from "src/app/ports/hasher/hasher.interface";
import { IJwtGenerateTokens, IJwtGenerateTokensToken } from "src/app/ports/jwt/jwt-adapter.interface";
import { ILoadUserByParamRepository, ILoadUserByParamRepositoryToken } from "src/app/ports/repositories/user/load-user-by-param-repository.interface";

@Injectable()
export class SignInService implements ISignInService {
  constructor(
    @Inject(ICreateRefreshTokenServiceToken)
    private readonly createRefreshToken: ICreateRefreshTokenService,
    @Inject(ILoadUserByParamRepositoryToken)
    private readonly loadUserRepo: ILoadUserByParamRepository,
    @Inject(IHashComparerToken)
    private readonly argon: IHashComparer,
    @Inject(IJwtGenerateTokensToken)
    private readonly jwtService: IJwtGenerateTokens,
  ) {}

  async signIn(signInDto: SignInParams): Promise<SignInResponse> {
    const { email, password } = signInDto;
 
    const user = await this.loadUserRepo.findOne({ email });
    if (!user) 
      throw new NotFoundError('Credenciais inválidas. Verifique seu email e senha')

    const isPasswordValid = await this.argon.compare(password, user.password);
    if (!isPasswordValid) throw new NotFoundError(
      'Credenciais inválidas. Verifique seu email e senha'
    );

    const payload = { sub: user.id, username: user.username };
    const tokens = await this.jwtService.generateTokens(payload);
    
    const refreshTokenData = await this.createRefreshToken.createRefreshToken({
      userId: user.id,
      refreshToken: tokens.refreshToken,
      expiresAt: tokens.expiresAt,
    });

    return {
      userId: user.id,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      tokenId: refreshTokenData.id,
    };
  }
}