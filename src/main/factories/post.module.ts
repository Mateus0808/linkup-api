import { Module } from '@nestjs/common';
import { ICreatePostServiceToken } from 'src/app/interfaces/post/create-post-service-interface';
import { IDeletePostServiceToken } from 'src/app/interfaces/post/delete-post-service-interface';
import { IGetPostServiceToken } from 'src/app/interfaces/post/get-post-service.interface';
import { CreatePostService } from 'src/app/use-cases/post/create-post.service';
import { DeletePostService } from 'src/app/use-cases/post/delete-post.service';
import { GetPostService } from 'src/app/use-cases/post/get-post.service';
import { PostRepositoryModule } from 'src/infra/database/config/post-databse.module';
import { UserRepositoryModule } from 'src/infra/database/config/user-database.module';
import { PostController } from 'src/presentation/controllers/post.controller';

@Module({
  imports: [
    UserRepositoryModule,
    PostRepositoryModule
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
      provide: IDeletePostServiceToken,
      useClass: DeletePostService
    }
  ],
  exports: [],
})
export class PostModule {}