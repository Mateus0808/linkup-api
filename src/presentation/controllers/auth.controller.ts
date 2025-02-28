import { Body, Controller, Get, Inject, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
// import { Request } from "express";
import { SignInDto } from "src/app/dtos/auth.dto";
import { ISignInService, ISignInServiceToken } from "src/app/interfaces/auth/sign-in-service.interface";
import { ISignOutService, ISignOutServiceToken } from "src/app/interfaces/auth/sign-out-service.interface";
import { AccessTokenGuard } from "src/commom/guards/access-token.guard";


@Controller('auth')
export class AuthController {
  constructor(
    @Inject(ISignInServiceToken)
    private readonly signInService: ISignInService,
    @Inject(ISignOutServiceToken)
    private readonly signOutService: ISignOutService
  ) {}

  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.signInService.signIn(signInDto);
  }

  // @UseGuards(AccessTokenGuard)
  // @Get('logout')
  // async logout(@Req() req: Request) {
  //   const tokenId = req.user['tokenId'];
  //   await this.signOutService.signOut(tokenId)
  // }
}