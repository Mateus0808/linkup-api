import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UnauthorizedError } from 'src/app/errors/unauthorized-error';
import { IGetUserByParamService, IGetUserByParamServiceToken } from 'src/app/interfaces/user/get-user-by-param-service.interface';
import { JwtPayload } from 'src/app/ports/jwt/jwt-adapter.interface';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(IGetUserByParamServiceToken)
    private readonly userService: IGetUserByParamService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.execute({ id: payload.sub })
    if (user.id !== payload.sub) {
      throw new UnauthorizedError('Usuário não autorizado');
    }
    
    return {
      sub: payload.sub,
      username: payload.username
    };
  }
}