import { RefreshTokenDatabaseModel } from "../models/refresh-token.model"
import { UserDatabaseModel } from "../models/user.model"

export interface CreateRefreshTokenParams {
  user: UserDatabaseModel
  refreshToken: string
  expiresAt: Date
}

export interface ICreateRefreshTokenRepository {
  create: (params: CreateRefreshTokenParams) => Promise<RefreshTokenDatabaseModel | null>
}

export const ICreateRefreshTokenRepositoryToken = 'ICreateRefreshTokenRepositoryToken'