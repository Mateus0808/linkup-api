import { SignInDto } from "src/app/dtos/auth.dto"

export interface SignInResponse {
  accessToken: string
  refreshToken: string
}

export interface SignInParams extends SignInDto {}

export interface ISignInService {
  signIn(signInDto: SignInParams): Promise<SignInResponse>
}

export const ISignInServiceToken = 'ISignInServiceToken'