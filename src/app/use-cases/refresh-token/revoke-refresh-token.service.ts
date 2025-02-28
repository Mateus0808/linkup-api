import { Inject, Injectable } from "@nestjs/common";
import { NotFoundError } from "src/app/errors/not-found-error";
import { IRevokeRefreshTokenService } from "src/app/interfaces/refresh-token/revoke-refresh-token-service.interface";
import { IFindOneTokenRepository, IFindOneTokenRepositoryToken } from "src/app/ports/repositories/refresh-token/find-one-refresh-token.port.interface";
import { ISaveRefreshTokenRepository, ISaveRefreshTokenRepositoryToken } from "src/app/ports/repositories/refresh-token/save-refresh-token.interface";


@Injectable()
export class RevokeRefreshTokenService implements IRevokeRefreshTokenService {
  constructor(
    @Inject(ISaveRefreshTokenRepositoryToken)
    private readonly refreshTokenRepository: ISaveRefreshTokenRepository,
    @Inject(IFindOneTokenRepositoryToken)
    private readonly getRefreshTokenService: IFindOneTokenRepository,
  ) {}

  async revokeToken(tokenId: string): Promise<void> {
    const token = await this.getRefreshTokenService.findOne({ id: tokenId });
    if (!token) throw new NotFoundError('Token não encontrado')
    
    token.revoked = true;
    await this.refreshTokenRepository.save(token);
  }
}