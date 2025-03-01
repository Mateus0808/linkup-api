import { PostPageOptionsDto } from "src/app/dtos/post/post-page-options.dto"
import { GetPostResponse } from "./get-post-service.interface"
import { PageDto } from "src/commom/dtos/page.dto"

export interface IGetUserPostsService {
  execute: (userId: string, params: PostPageOptionsDto) => Promise<PageDto<GetPostResponse>>
}

export const IGetUserPostsServiceToken = 'IGetUserPostsServiceToken'