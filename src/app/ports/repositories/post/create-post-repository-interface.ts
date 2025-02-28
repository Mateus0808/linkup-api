import { CreatePostParams } from 'src/app/interfaces/post/create-post-service-interface'
import { PostDatabaseModel } from '../models/post.model'
import { UserDatabaseModel } from '../models/user.model'

export interface CreatePostRepositoryParams extends Omit<CreatePostParams, 'userId'> {
  user: UserDatabaseModel
}

export interface ICreatePostRepository {
  create: (
    createPostParams: CreatePostRepositoryParams,
  ) => Promise<PostDatabaseModel | null>
}

export const ICreatePostRepositoryToken = 'ICreatePostRepositoryToken'
