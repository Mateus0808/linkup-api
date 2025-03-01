import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../pg/post.entity';
import { ICreatePostRepositoryToken } from 'src/app/ports/repositories/post/create-post-repository-interface';
import { PostRepository } from '../repositories/db-post.repository';
import { IDeletePostRepositoryToken } from 'src/app/ports/repositories/post/delete-post-repository-interface';
import { ILoadPostRepositoryToken } from 'src/app/ports/repositories/post/load-post-repository.interface';
import { ILoadUserPostsRepositoryToken } from 'src/app/ports/repositories/post/load-user-posts-repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [],
  providers: [
    {
      provide: ICreatePostRepositoryToken,
      useClass: PostRepository
    },
    {
      provide: ILoadPostRepositoryToken,
      useClass: PostRepository
    },
    {
      provide: ILoadUserPostsRepositoryToken,
      useClass: PostRepository
    },
    {
      provide: IDeletePostRepositoryToken,
      useClass: PostRepository
    }
  ],
  exports: [
    ICreatePostRepositoryToken,
    ILoadUserPostsRepositoryToken,
    IDeletePostRepositoryToken,
    ILoadPostRepositoryToken
  ],
})
export class PostRepositoryModule {}