import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IJwtGenerateTokens, JwtPayload, JwtTokensResponse } from 'src/app/ports/jwt/jwt-adapter.interface';

@Injectable()
export class JwtAdapterService implements IJwtGenerateTokens {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async generateTokens(payload: JwtPayload): Promise<JwtTokensResponse> {
    const expiresIn = 24 * 60 * 60 * 1000; // 1 dia em milissegundos
    const expiresAt = new Date(Date.now() + expiresIn);

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: '1h',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '1d',
      }),
    ]);

    return {
      refreshToken,
      accessToken,
      expiresAt
    }
  }
}