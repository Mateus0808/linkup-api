import { PostDatabaseModel } from "../models/post.model"
import { UserDatabaseModel } from "../models/user.model"

export interface GetCommentRepositoryResponse {
  id: string
  user: UserDatabaseModel
  post: PostDatabaseModel
  description: string
  createdAt: Date
  updatedAt: Date
}

export interface ILoadCommentRepository {
  findOne(commentId: string): Promise<GetCommentRepositoryResponse | null>
}


export const ILoadCommentRepositoryToken = 'ILoadCommentRepositoryToken'