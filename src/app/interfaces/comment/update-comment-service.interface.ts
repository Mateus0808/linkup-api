import { GetUserResponse } from "../user/get-user-by-param-service.interface"

export interface UpdateCommentServiceParams {
  commentId: string
  userId: string
  description: string
}

export interface UpdateCommentServiceResponse {
  id: string
  postId: string
  user: Partial<GetUserResponse>
  description: string
  createdAt: Date
  updatedAt: Date
}

export interface IUpdateCommentService {
  execute: (
    commentParams: UpdateCommentServiceParams,
  ) => Promise<UpdateCommentServiceResponse>
}

export const IUpdateCommentServiceToken = 'IUpdateCommentServiceToken'