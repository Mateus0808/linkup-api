export interface IRevokeRefreshTokenService {
  revokeToken: (tokenId: string) => Promise<void>
}

export const IRevokeRefreshTokenServiceToken = 'IRevokeRefreshTokenServiceToken'