import { PostDatabaseModel } from "../models/post.model"
import { UserDatabaseModel } from "../models/user.model"

export interface UpdateCommentRepositoryParams {
  commentId: string
  description: string
}

export interface UpdateCommentRepositoryResponse {
  id: string
  user: UserDatabaseModel
  post: PostDatabaseModel
  description: string
  createdAt: Date
  updatedAt: Date
}

export interface IUpdateCommentRepository {
  update: (
    commentParams: UpdateCommentRepositoryParams,
  ) => Promise<boolean | null>
}

export const IUpdateCommentRepositoryToken = 'IUpdateCommentRepositoryToken'