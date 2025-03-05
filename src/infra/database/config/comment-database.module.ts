import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '../pg/comment.entity';
import { ICreateCommentRepositoryToken } from 'src/app/ports/repositories/comment/create-comment-repository.interface';
import { CommentRepository } from '../repositories/db-comment.repository';
import { ILoadCommentRepositoryToken } from 'src/app/ports/repositories/comment/get-comment-repository.interface';
import { IDeleteCommentRepositoryToken } from 'src/app/ports/repositories/comment/delete-comment-repository.interface';
import { IUpdateCommentRepositoryToken } from 'src/app/ports/repositories/comment/update-comment-repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  controllers: [],
  providers: [
    {
      provide: ICreateCommentRepositoryToken,
      useClass: CommentRepository
    },
    {
      provide: ILoadCommentRepositoryToken,
      useClass: CommentRepository
    },
    {
      provide: IDeleteCommentRepositoryToken,
      useClass: CommentRepository
    },
    {
      provide: IUpdateCommentRepositoryToken,
      useClass: CommentRepository
    },
  ],
  exports: [
    ICreateCommentRepositoryToken,
    ILoadCommentRepositoryToken,
    IUpdateCommentRepositoryToken,
    IDeleteCommentRepositoryToken
  ],
})
export class CommentRepositoryModule {}