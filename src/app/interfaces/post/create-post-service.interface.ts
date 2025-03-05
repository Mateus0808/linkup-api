import { PostDatabaseModel } from 'src/app/ports/repositories/models/post.model'

export interface CreatePostParams {
  userId: string
  title: string
  description: string
  imageUrl?: string
}

export interface CreatePostResponse extends PostDatabaseModel {}

export interface ICreatePostService {
  execute: (
    createPostParams: CreatePostParams,
  ) => Promise<CreatePostResponse>
}

export const ICreatePostServiceToken = 'ICreatePostServiceToken'
