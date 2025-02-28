import { Module } from '@nestjs/common';
import { ArgonAdapterModule } from 'src/infra/argon-adapter/argon-adapter.module';

import { UserModule } from './user.module';
import { JwtAdapterServiceModule } from 'src/infra/jwt/ jwt-adapter.module';
import { ISignInServiceToken } from 'src/app/interfaces/auth/sign-in-service.interface';
import { SignInService } from 'src/app/use-cases/auth/sign-in.service';
import { ICreateRefreshTokenServiceToken } from 'src/app/interfaces/refresh-token/create-refresh-token-service.interface';
import { RefreshTokenRepositoyModule } from 'src/infra/database/config/refresh-token-database.module';
import { AuthController } from 'src/presentation/controllers/auth.controller';
import { AccessTokenStrategy } from 'src/infra/auth/strategies/access-token.strategy';
import { RefreshTokenStrategy } from 'src/infra/auth/strategies/refresh-token.strategy';
import { CreateRefreshTokenService } from 'src/app/use-cases/refresh-token/create-refresh-token.service';
import { UserRepositoryModule } from 'src/infra/database/config/user-database.module';
import { ISignOutServiceToken } from 'src/app/interfaces/auth/sign-out-service.interface';
import { SignOutService } from 'src/app/use-cases/auth/sign-out.service';
import { IRevokeRefreshTokenServiceToken } from 'src/app/interfaces/refresh-token/revoke-refresh-token-service.interface';
import { RevokeRefreshTokenService } from 'src/app/use-cases/refresh-token/revoke-refresh-token.service';

@Module({
  imports: [
    UserModule,
    UserRepositoryModule,
    RefreshTokenRepositoyModule,
    ArgonAdapterModule,
    JwtAdapterServiceModule,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: ISignInServiceToken,
      useClass: SignInService
    },
    {
      provide: ISignOutServiceToken,
      useClass: SignOutService
    },
    {
      provide: ICreateRefreshTokenServiceToken,
      useClass: CreateRefreshTokenService
    },
    {
      provide: IRevokeRefreshTokenServiceToken,
      useClass: RevokeRefreshTokenService
    },
    AccessTokenStrategy, 
    RefreshTokenStrategy
  ],
  exports: [],
})
export class AuthModule {}