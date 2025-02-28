import { CreateRefreshTokenDto } from "src/app/dtos/refresh-token/create-refresh-token.dto";
import { RefreshTokenDatabaseModel } from "src/app/ports/repositories/models/refresh-token.model";

export interface CreateRefreshTokenReponse extends RefreshTokenDatabaseModel {}

export interface ICreateRefreshTokenService {
  createRefreshToken: (createRefreshTokenDto: CreateRefreshTokenDto
  ) => Promise<CreateRefreshTokenReponse>
}

export const ICreateRefreshTokenServiceToken = 'ICreateRefreshTokenServiceToken'