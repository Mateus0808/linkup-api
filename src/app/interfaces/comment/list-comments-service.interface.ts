import { PageOptionsDto } from "src/commom/dtos/page-options.dto"
import { PageDto } from "src/commom/dtos/page.dto"

interface CommentServiceResponse {
  id: string
  description: string
  post: string
  user: string
  createdAt: Date
  updatedAt: Date
}

export interface IListCommentsService {
  execute: (
    pageOptionsDto: PageOptionsDto,
  ) => Promise<PageDto<CommentServiceResponse>>
}

export const IListCommentsServiceToken = 'IListCommentsServiceToken'