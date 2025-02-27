import { Module } from '@nestjs/common';
import { ICreateUserServiceToken } from 'src/app/interfaces/user/create-user-service.interface';
import { CreateUserService } from 'src/app/use-cases/user/create-user.service';
import { ArgonAdapterModule } from 'src/infra/argon-adapter/argon-adapter.module';
import { UserRepositoryModule } from 'src/infra/database/config/user-database.module';
import { UserController } from 'src/presentation/controllers/user.controller';

@Module({
  imports: [UserRepositoryModule, ArgonAdapterModule],
  controllers: [UserController],
  providers: [
    {
      provide: ICreateUserServiceToken,
      useClass: CreateUserService,
    }
  ],
  exports: [],
})
export class UserModule {}