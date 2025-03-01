import { PostDatabaseModel } from "../models/post.model";

export interface LoadUserPostsRepositoryParams {
  userId: string
  page: number
  limit: number
}

export interface LoadUserPostsRepositoryResponse {
  data: PostDatabaseModel[]
  total: number
}

export interface ILoadUserPostsRepository {
  loadUserPosts: (
    params: LoadUserPostsRepositoryParams
  ) => Promise<LoadUserPostsRepositoryResponse>
}

export const ILoadUserPostsRepositoryToken = 'ILoadUserPostsRepositoryToken'