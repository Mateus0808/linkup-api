import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArgonAdapterModule } from 'src/infra/argon-adapter/argon-adapter.module';
import { UserRepositoryModule } from './user-database.module';
import { RefreshToken } from '../pg/refresh-token.entity';
import { ICreateRefreshTokenRepositoryToken } from 'src/app/ports/repositories/refresh-token/create-refresh-token.interface';
import { RefreshTokenRepository } from '../repositories/db-refresh-token.repository';
import { ISaveRefreshTokenRepositoryToken } from 'src/app/ports/repositories/refresh-token/save-refresh-token.interface';
import { IFindOneTokenRepositoryToken } from 'src/app/ports/repositories/refresh-token/find-one-refresh-token.port.interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshToken]),
    UserRepositoryModule,
    ArgonAdapterModule,
  ],
  controllers: [],
  providers: [
    {
      provide: ICreateRefreshTokenRepositoryToken,
      useClass: RefreshTokenRepository
    },
    {
      provide: ISaveRefreshTokenRepositoryToken,
      useClass: RefreshTokenRepository
    },
    {
      provide: IFindOneTokenRepositoryToken,
      useClass: RefreshTokenRepository
    }
  ],
  exports: [
    ICreateRefreshTokenRepositoryToken, 
    ISaveRefreshTokenRepositoryToken,
    IFindOneTokenRepositoryToken
  ],
})
export class RefreshTokenRepositoyModule {}