import { Module } from '@nestjs/common';
import { ICreateCommentServiceToken } from 'src/app/interfaces/comment/create-comment-service.interface';
import { IDeleteCommentServiceToken } from 'src/app/interfaces/comment/delete-comment-service.interface';
import { IGetCommentServiceToken } from 'src/app/interfaces/comment/get-comment-service.interface';
import { IUpdateCommentServiceToken } from 'src/app/interfaces/comment/update-comment-service.interface';
import { CreateCommentService } from 'src/app/use-cases/comment/create-comment.service';
import { DeleteCommentService } from 'src/app/use-cases/comment/delete-comment.service';
import { GetCommentService } from 'src/app/use-cases/comment/get-comment.service';
import { UpdateCommentService } from 'src/app/use-cases/comment/update-comment.service';
import { CommentRepositoryModule } from 'src/infra/database/config/comment-database.module';
import { CommentController } from 'src/presentation/controllers/comment.controller';
import { PostModule } from './post.module';
import { JwtAdapterServiceModule } from 'src/infra/jwt/ jwt-adapter.module';
import { UserModule } from './user.module';

@Module({
  imports: [
    UserModule,
    CommentRepositoryModule,
    JwtAdapterServiceModule,
    PostModule
  ],
  controllers: [CommentController],
  providers: [
    {
      provide: ICreateCommentServiceToken,
      useClass: CreateCommentService
    },
    {
      provide: IGetCommentServiceToken,
      useClass: GetCommentService
    }, 
    {
      provide: IUpdateCommentServiceToken,
      useClass: UpdateCommentService
    },
    {
      provide: IDeleteCommentServiceToken,
      useClass: DeleteCommentService
    }
  ],
  exports: [],
})
export class CommentModule {}