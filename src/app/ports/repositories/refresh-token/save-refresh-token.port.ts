import { RefreshTokenDatabaseModel } from "../models/refresh-token.model"

export interface ISaveRefreshTokenRepository {
  save: (token: RefreshTokenDatabaseModel) => Promise<RefreshTokenDatabaseModel>
}

export const ISaveRefreshTokenRepositoryToken = 'ISaveRefreshTokenRepositoryToken'