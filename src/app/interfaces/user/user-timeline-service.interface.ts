import { PageDto } from 'src/commom/dtos/page.dto'
import { GetPostResponse } from '../post/get-post-service.interface'
import { PageOptionsDto } from 'src/commom/dtos/page-options.dto'

export interface IUserTimelineService {
  execute: (userId: string, pageOptionsDto: PageOptionsDto) => Promise<PageDto<GetPostResponse>>
}

export const IUserTimelineServiceToken = 'IUserTimelineServiceToken'