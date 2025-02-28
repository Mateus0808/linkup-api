import { PostDatabaseModel } from "../models/post.model";

export interface ILoadPostRepository {
  findOne: (postId: string) => Promise<PostDatabaseModel | null>
}

export const ILoadPostRepositoryToken = 'ILoadPostRepositoryToken'