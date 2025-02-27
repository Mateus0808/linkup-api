import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../pg/user.entity';
import { ICreateUserRepositoryToken } from 'src/app/ports/repositories/user/create-user-repository.interface';
import { UserRepository } from '../repositories/db-user.repository';
import { ILoadUserByParamRepositoryToken } from 'src/app/ports/repositories/user/load-user-by-param-repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [],
  providers: [
    {
      provide: ICreateUserRepositoryToken,
      useClass: UserRepository
    },
    {
      provide: ILoadUserByParamRepositoryToken,
      useClass: UserRepository
    },
  ],
  exports: [ICreateUserRepositoryToken, ILoadUserByParamRepositoryToken],
})
export class UserRepositoryModule {}