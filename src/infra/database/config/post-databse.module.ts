import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../pg/post.entity';
import { ICreatePostRepositoryToken } from 'src/app/ports/repositories/post/create-post-repository-interface';
import { PostRepository } from '../repositories/db-post.repository';
import { IDeletePostRepositoryToken } from 'src/app/ports/repositories/post/delete-post-repository-interface';
import { ILoadPostRepositoryToken } from 'src/app/ports/repositories/post/load-post-repository.interface';
import { ILoadUserPostsRepositoryToken } from 'src/app/ports/repositories/post/load-user-posts-repository.interface';
import { IUpdatePostRepositoryToken } from 'src/app/ports/repositories/post/update-user-repository.port';
import { ILoadUserPostsWithourPaginationToken } from 'src/app/ports/repositories/post/load-user-posts-without-pagination.interface';

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
      provide: IUpdatePostRepositoryToken,
      useClass: PostRepository
    },
    {
      provide: IDeletePostRepositoryToken,
      useClass: PostRepository
    },
    {
      provide: ILoadUserPostsWithourPaginationToken,
      useClass: PostRepository
    }
  ],
  exports: [
    ICreatePostRepositoryToken,
    ILoadUserPostsRepositoryToken,
    IDeletePostRepositoryToken,
    IUpdatePostRepositoryToken,
    ILoadPostRepositoryToken,
    ILoadUserPostsWithourPaginationToken
  ],
})
export class PostRepositoryModule {}