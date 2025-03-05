import { GetUserResponse } from "../user/get-user-by-param-service.interface"

export interface CreateCommentParams {
  userId: string
  postId: string
  description: string
}

export interface CreateCommentResponse {
  id: string
  postId: string
  user: Partial<GetUserResponse>
  description: string
  createdAt: Date
}

export interface ICreateCommentService {
  execute: (
    createCommentParams: CreateCommentParams,
  ) => Promise<CreateCommentResponse>
}

export const ICreateCommentServiceToken = 'ICreateCommentServiceToken'