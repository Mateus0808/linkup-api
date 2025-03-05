import { SignInDto } from "src/app/dtos/auth.dto"

export interface SignInResponse {
  userId: string
  accessToken: string
  refreshToken: string
  tokenId: string
}

export interface SignInParams extends SignInDto {}

export interface ISignInService {
  signIn(signInDto: SignInParams): Promise<SignInResponse>
}

export const ISignInServiceToken = 'ISignInServiceToken'