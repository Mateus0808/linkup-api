import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArgonAdapterModule } from 'src/infra/argon-adapter/argon-adapter.module';
import { UserRepositoryModule } from './user-database.module';
import { RefreshToken } from '../pg/refresh-token.entity';
import { ICreateRefreshTokenRepositoryToken } from 'src/app/ports/repositories/refresh-token/create-refresh-token.interface';
import { RefreshTokenRepository } from '../repositories/db-refresh-token.repository';

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
  ],
  exports: [ICreateRefreshTokenRepositoryToken],
})
export class RefreshTokenRepositoyModule {}