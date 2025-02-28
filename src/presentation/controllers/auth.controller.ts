import { Body, Controller, Inject, Post } from "@nestjs/common";
import { SignInDto } from "src/app/dtos/auth.dto";
import { ISignInService, ISignInServiceToken } from "src/app/interfaces/auth/sign-in-service.interface";


@Controller('auth')
export class AuthController {
  constructor(
    @Inject(ISignInServiceToken)
    private readonly signInService: ISignInService,
  ) {}

  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.signInService.signIn(signInDto);
  }
}