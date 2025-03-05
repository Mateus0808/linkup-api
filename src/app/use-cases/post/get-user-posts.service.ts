import { Inject, Injectable } from "@nestjs/common";
import { PostPageOptionsDto } from "src/app/dtos/post/post-page-options.dto";
import { GetPostResponse } from "src/app/interfaces/post/get-post-service.interface";
import { IGetUserPostsParams, IGetUserPostsService } from "src/app/interfaces/post/get-user-posts-service.interface";
import { IGetUserByParamService, IGetUserByParamServiceToken } from "src/app/interfaces/user/get-user-by-param-service.interface";
import { mapToPostResponseDto } from "src/app/mappers/post.mapper";
import { ILoadUserPostsRepository, ILoadUserPostsRepositoryToken } from "src/app/ports/repositories/post/load-user-posts-repository.interface";
import { PageMetaDto } from "src/commom/dtos/page-meta.dto";
import { PageDto } from "src/commom/dtos/page.dto";
import { generatePaginationLinks } from "src/commom/utils/generate-pagination-links.util";

@Injectable()
export class GetUserPostsService implements IGetUserPostsService {
  constructor(
    @Inject(IGetUserByParamServiceToken)
    private readonly getUserService: IGetUserByParamService,
    @Inject(ILoadUserPostsRepositoryToken)
    private readonly loadUserPostsRepo: ILoadUserPostsRepository
  ) {}

  async execute (criteria: IGetUserPostsParams, params: PostPageOptionsDto): Promise<PageDto<GetPostResponse>> {
    const { limit, page } = params
    console.log('criteria', criteria)
    const user = await this.getUserService.execute({
      ...criteria
    })
    console.log('criteria user', user.id)
    const { data, total } = await this.loadUserPostsRepo.loadUserPosts({
      userId: user.id, limit, page
    })
    console.log('criteria user', data)
    const mappedData = data.map(mapToPostResponseDto);
    const links = generatePaginationLinks('posts', page, limit, total);

    const pageMetaDto = new PageMetaDto({ 
      itemCount: total, pageOptionsDto: params, links: links 
    });

    return new PageDto(mappedData, pageMetaDto);
  }
}