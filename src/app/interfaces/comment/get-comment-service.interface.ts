import { GetUserResponse } from "../user/get-user-by-param-service.interface"

export interface GetCommentResponse {
  id: string
  postId: string
  user: Partial<GetUserResponse>
  description: string
  createdAt: Date
  updatedAt: Date
}

export interface IGetCommentService {
  execute: (commentId: string) => Promise<GetCommentResponse>
}

export const IGetCommentServiceToken = 'IGetCommentServiceToken'