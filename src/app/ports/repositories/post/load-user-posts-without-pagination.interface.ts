import { PostDatabaseModel } from "../models/post.model";

export interface ILoadUserPostsWithourPagination {
  findUserPosts (userId: string): Promise<PostDatabaseModel[]>
}

export const ILoadUserPostsWithourPaginationToken = 'ILoadUserPostsWithourPaginationToken'