import { forwardRef, Module } from '@nestjs/common';
import { ICreateUserServiceToken } from 'src/app/interfaces/user/create-user-service.interface';
import { IFollowUserServiceToken } from 'src/app/interfaces/user/follow-user-service.interface';
import { IGetUserByParamServiceToken } from 'src/app/interfaces/user/get-user-by-param-service.interface';
import { IFindUsersWithPaginationServiceToken } from 'src/app/interfaces/user/list-users-service.interface';
import { IUnfollowUserServiceToken } from 'src/app/interfaces/user/unfollow-user-service.interface';
import { IUpdateUserServiceToken } from 'src/app/interfaces/user/update-user-service.interface';
import { IUserTimelineServiceToken } from 'src/app/interfaces/user/user-timeline-service.interface';
import { CreateUserService } from 'src/app/use-cases/user/create-user.service';
import { FollowUserService } from 'src/app/use-cases/user/follow-user.service';
import { GetUserByParamService } from 'src/app/use-cases/user/get-user.service';
import { FindUsersWithPaginationService } from 'src/app/use-cases/user/list-users.service';
import { UnfollowUserService } from 'src/app/use-cases/user/unfollow-user.service';
import { UpdateUserService } from 'src/app/use-cases/user/update-user.service';
import { UserTimelineService } from 'src/app/use-cases/user/user-timeline.service';
import { ArgonAdapterModule } from 'src/infra/argon-adapter/argon-adapter.module';
import { UserRepositoryModule } from 'src/infra/database/config/user-database.module';
import { JwtAdapterServiceModule } from 'src/infra/jwt/ jwt-adapter.module';
import { UserController } from 'src/presentation/controllers/user.controller';
import { PostModule } from './post.module';

@Module({
  imports: [
    UserRepositoryModule, 
    forwardRef(() => PostModule),
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
    },
    {
      provide: IFollowUserServiceToken,
      useClass: FollowUserService
    },
    {
      provide: IUnfollowUserServiceToken,
      useClass: UnfollowUserService
    }, 
    {
      provide: IUserTimelineServiceToken,
      useClass: UserTimelineService
    }
  ],
  exports: [IGetUserByParamServiceToken],
})
export class UserModule {}