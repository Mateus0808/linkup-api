export interface JwtPayload {
  id: string
  username: string
};

export interface JwtTokensResponse {
  refreshToken: string
  accessToken: string
  expiresAt: Date
}

export interface IJwtGenerateTokens {
  generateTokens: (payload: JwtPayload) => Promise<JwtTokensResponse>
}

export const IJwtGenerateTokensToken = 'IJwtGenerateTokensToken'