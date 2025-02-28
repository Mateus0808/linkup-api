import { Module } from '@nestjs/common';
import { JwtAdapterService } from './jwt-adapter.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { IJwtGenerateTokensToken } from 'src/app/ports/jwt/jwt-adapter.interface';

@Module({
  imports: [JwtModule.register({})],
  providers: [
    JwtService,
    {
      provide: IJwtGenerateTokensToken,
      useClass: JwtAdapterService
    }
  ],
  exports: [IJwtGenerateTokensToken, JwtService],
})
export class JwtAdapterServiceModule {}