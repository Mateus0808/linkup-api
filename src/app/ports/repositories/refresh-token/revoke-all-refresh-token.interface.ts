export interface RevokeRefreshTokenResponse {
  message: string
}

export interface IRevokeAllRefreshTokenByUserRepository {
  revokeTokensByUser(userId: string): Promise<RevokeRefreshTokenResponse | null>;
}

export const IRevokeAllRefreshTokenByUserRepositoryToken = 'IRevokeAllRefreshTokenByUserRepositoryToken'