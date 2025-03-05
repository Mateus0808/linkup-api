import { Inject, Injectable } from '@nestjs/common';
import { IGeneratePostsReportService, PostsReportsParams, PostsReportsResponse } from 'src/app/interfaces/report/generate-posts-report.interface';
import { ILoadUserPostsWithourPagination, ILoadUserPostsWithourPaginationToken } from 'src/app/ports/repositories/post/load-user-posts-without-pagination.interface';

@Injectable()
export class GeneratePostsReportService implements IGeneratePostsReportService {
  constructor(
    @Inject(ILoadUserPostsWithourPaginationToken)
    private readonly loadUserPostsRepo: ILoadUserPostsWithourPagination
  ) {}

  async execute(params: PostsReportsParams): Promise<PostsReportsResponse> {
    const { userId } = params;

    const posts = await this.loadUserPostsRepo.findUserPosts(userId);

    const reports = posts.map((post) => ({
      title: post.title,
      numberComments: post.comments.length,
      likes: post.likes.length,
    }));

    return { reports };
  }
}