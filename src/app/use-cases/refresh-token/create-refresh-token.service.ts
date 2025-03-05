import { Inject, Injectable } from "@nestjs/common";
import { CreateRefreshTokenDto } from "src/app/dtos/refresh-token/create-refresh-token.dto";
import { UnauthorizedError } from "src/app/errors/unauthorized-error";
import { CreateRefreshTokenReponse, ICreateRefreshTokenService } from "src/app/interfaces/refresh-token/create-refresh-token-service.interface";
import { IHasher, IHasherToken } from "src/app/ports/hasher/hasher.interface";
import { IJwtGenerateTokens, IJwtGenerateTokensToken } from "src/app/ports/jwt/jwt-adapter.interface";
import { ICreateRefreshTokenRepository, ICreateRefreshTokenRepositoryToken } from "src/app/ports/repositories/refresh-token/create-refresh-token.interface";
import { ILoadUserByParamRepository, ILoadUserByParamRepositoryToken } from "src/app/ports/repositories/user/load-user-by-param-repository.interface";

@Injectable()
export class CreateRefreshTokenService implements ICreateRefreshTokenService {
  constructor(
    @Inject(ICreateRefreshTokenRepositoryToken)
    private readonly refreshTokenRepository: ICreateRefreshTokenRepository,
    @Inject(ILoadUserByParamRepositoryToken)
    private readonly userRepo: ILoadUserByParamRepository,
    @Inject(IHasherToken)
    private readonly hashData: IHasher
  ) {}

  async createRefreshToken(
    createRefreshTokenDto: CreateRefreshTokenDto
  ): Promise<CreateRefreshTokenReponse> {
    const user = await this.userRepo.findOne({ id: createRefreshTokenDto.userId });
    
    if (!user) throw new UnauthorizedError('Usuário não encontrado');

    const hashedRefreshToken = await this.hashData.hash(
      createRefreshTokenDto.refreshToken
    );
    
    const newToken = this.refreshTokenRepository.create({
      user,
      refreshToken: hashedRefreshToken,
      expiresAt: createRefreshTokenDto.expiresAt
    });

    return newToken
  }
}