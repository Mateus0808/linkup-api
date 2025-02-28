import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../pg/user.entity';
import { ICreateUserRepositoryToken } from 'src/app/ports/repositories/user/create-user-repository.interface';
import { UserRepository } from '../repositories/db-user.repository';
import { ILoadUserByParamRepositoryToken } from 'src/app/ports/repositories/user/load-user-by-param-repository.interface';
import { IUpdateUserRepositoryToken } from 'src/app/ports/repositories/user/update-user-repository.port';
import { IFindAllUsersRepositoryToken } from 'src/app/ports/repositories/user/find-all-users-repository.port';

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
    {
      provide: IFindAllUsersRepositoryToken,
      useClass: UserRepository
    },
    {
      provide: IUpdateUserRepositoryToken,
      useClass: UserRepository
    },
  ],
  exports: [
    ICreateUserRepositoryToken, 
    ILoadUserByParamRepositoryToken,
    IUpdateUserRepositoryToken,
    IFindAllUsersRepositoryToken
  ],
})
export class UserRepositoryModule {}