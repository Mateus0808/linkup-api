import { Inject, Injectable } from "@nestjs/common";
import { GetPostResponse } from "src/app/interfaces/post/get-post-service.interface";
import { IGetUserPostsService, IGetUserPostsServiceToken } from "src/app/interfaces/post/get-user-posts-service.interface";
import { IGetUserByParamService, IGetUserByParamServiceToken } from "src/app/interfaces/user/get-user-by-param-service.interface";
import { IUserTimelineService } from "src/app/interfaces/user/user-timeline-service.interface";
import { PageMetaDto } from "src/commom/dtos/page-meta.dto";
import { PageOptionsDto } from "src/commom/dtos/page-options.dto";
import { PageDto } from "src/commom/dtos/page.dto";
import { generatePaginationLinks } from "src/commom/utils/generate-pagination-links.util";

@Injectable()
export class UserTimelineService implements IUserTimelineService {
  constructor(
    @Inject(IGetUserByParamServiceToken)
    private readonly getUserService: IGetUserByParamService,
    @Inject(IGetUserPostsServiceToken)
    private readonly getUserPostsService: IGetUserPostsService
  ) {}

  async execute(userId: string, pageOptionsDto: PageOptionsDto): Promise<PageDto<GetPostResponse>> {
    const user = await this.getUserService.execute({ id: userId })

    const userPosts = await this.getUserPostsService.execute(
      { id: userId },
      pageOptionsDto
    );
    
    const friendPosts = await Promise.all(
      user.followings.map(async (friendId) => {
        return  await this.getUserPostsService.execute(
          { id: friendId },
          pageOptionsDto
        );
      }),
    );
    
    const allPosts = [...userPosts.data, ...friendPosts.flatMap((fp) => fp.data)];

    const startIndex = (pageOptionsDto.page - 1) * pageOptionsDto.limit;
    const endIndex = startIndex + pageOptionsDto.limit;
    const paginatedPosts = allPosts.slice(startIndex, endIndex);

    const total = allPosts.length;
    const links = generatePaginationLinks(
      'users/timeline', pageOptionsDto.page, pageOptionsDto.limit, total
    );

    const pageMetaDto = new PageMetaDto({
      itemCount: total,
      pageOptionsDto,
      links
    });
    console.log("friendPosts", paginatedPosts)
    return new PageDto(paginatedPosts, pageMetaDto);
  }
}