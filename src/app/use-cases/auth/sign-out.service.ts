import { Inject, Injectable } from "@nestjs/common";
import { ISignOutService } from "src/app/interfaces/auth/sign-out-service.interface";
import { IRevokeRefreshTokenService, IRevokeRefreshTokenServiceToken } from "src/app/interfaces/refresh-token/revoke-refresh-token-service.interface";

@Injectable()
export class SignOutService implements ISignOutService {
  constructor(
    @Inject(IRevokeRefreshTokenServiceToken)
    private readonly tokenService: IRevokeRefreshTokenService
  ) {}

  async signOut(tokenId: string): Promise<void> {
    await this.tokenService.revokeToken(tokenId)
  }
}