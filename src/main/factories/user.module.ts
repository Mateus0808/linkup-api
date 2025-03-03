import { Module } from '@nestjs/common';
import { ICreateUserServiceToken } from 'src/app/interfaces/user/create-user-service.interface';
import { IGetUserByParamServiceToken } from 'src/app/interfaces/user/get-user-by-param-service.interface';
import { IFindUsersWithPaginationServiceToken } from 'src/app/interfaces/user/list-users-service.interface';
import { IUpdateUserServiceToken } from 'src/app/interfaces/user/update-user-service.interface';
import { CreateUserService } from 'src/app/use-cases/user/create-user.service';
import { GetUserByParamService } from 'src/app/use-cases/user/get-user.service';
import { FindUsersWithPaginationService } from 'src/app/use-cases/user/list-users.service';
import { UpdateUserService } from 'src/app/use-cases/user/update-user.service';
import { ArgonAdapterModule } from 'src/infra/argon-adapter/argon-adapter.module';
import { UserRepositoryModule } from 'src/infra/database/config/user-database.module';
import { JwtAdapterServiceModule } from 'src/infra/jwt/ jwt-adapter.module';
import { UserController } from 'src/presentation/controllers/user.controller';

@Module({
  imports: [
    UserRepositoryModule, 
    ArgonAdapterModule,
    JwtAdapterServiceModule
  ],
  controllers: [UserController],
  providers: [
    {
      provide: ICreateUserServiceToken,
      useClass: CreateUserService,
    },
    {
      provide: IGetUserByParamServiceToken,
      useClass: GetUserByParamService
    },
    {
      provide: IFindUsersWithPaginationServiceToken,
      useClass: FindUsersWithPaginationService
    },
    {
      provide: IUpdateUserServiceToken,
      useClass: UpdateUserService
    }
  ],
  exports: [IGetUserByParamServiceToken],
})
export class UserModule {}