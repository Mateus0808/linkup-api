import { forwardRef, Module } from '@nestjs/common';
import { ICreatePostServiceToken } from 'src/app/interfaces/post/create-post-service.interface';
import { IDeletePostServiceToken } from 'src/app/interfaces/post/delete-post-service.interface';
import { IGetPostServiceToken } from 'src/app/interfaces/post/get-post-service.interface';
import { IGetUserPostsServiceToken } from 'src/app/interfaces/post/get-user-posts-service.interface';
import { CreatePostService } from 'src/app/use-cases/post/create-post.service';
import { DeletePostService } from 'src/app/use-cases/post/delete-post.service';
import { GetPostService } from 'src/app/use-cases/post/get-post.service';
import { GetUserPostsService } from 'src/app/use-cases/post/get-user-posts.service';
import { PostRepositoryModule } from 'src/infra/database/config/post-databse.module';
import { UserRepositoryModule } from 'src/infra/database/config/user-database.module';
import { PostController } from 'src/presentation/controllers/post.controller';
import { UserModule } from './user.module';
import { IUpdatePostServiceToken } from 'src/app/interfaces/post/update-post-service.interface';
import { UpdatePostService } from 'src/app/use-cases/post/update-post.service';
import { JwtAdapterServiceModule } from 'src/infra/jwt/ jwt-adapter.module';
import { MulterModule } from '@nestjs/platform-express';
import { IToggleLikeOnPostServiceToken } from 'src/app/interfaces/post/toggle-like-on-post-service.interface';
import { ToggleLikeOnPostService } from 'src/app/use-cases/post/toggle-like-on-post.service';
import { IGeneratePostsReportToken } from 'src/app/interfaces/report/generate-posts-report.interface';
import { GeneratePostsReportService } from 'src/app/use-cases/report/generate-report.service';

@Module({
  imports: [
    UserRepositoryModule,
    forwardRef(() => UserModule),
    PostRepositoryModule, 
    JwtAdapterServiceModule,
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [PostController],
  providers: [
    {
      provide: ICreatePostServiceToken,
      useClass: CreatePostService
    },
    {
      provide: IGetPostServiceToken,
      useClass: GetPostService
    },
    {
      provide: IGetUserPostsServiceToken,
      useClass: GetUserPostsService
    },
    {
      provide: IUpdatePostServiceToken,
      useClass: UpdatePostService
    },
    {
      provide: IDeletePostServiceToken,
      useClass: DeletePostService
    },
    {
      provide: IToggleLikeOnPostServiceToken,
      useClass: ToggleLikeOnPostService
    },
    {
      provide: IGeneratePostsReportToken,
      useClass: GeneratePostsReportService
    }
  ],
  exports: [IGetPostServiceToken, IGetUserPostsServiceToken],
})
export class PostModule {}