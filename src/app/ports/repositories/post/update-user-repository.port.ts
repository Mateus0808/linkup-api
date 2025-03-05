import { UpdatePostDto } from "src/app/dtos/post/update-post.dto"
import { PostDatabaseModel } from "../models/post.model"

export interface UpdatePostRepoParams extends Partial<UpdatePostDto> {}

export interface IUpdatePostRepository {
  update: (postId: string, data: UpdatePostRepoParams) => Promise<PostDatabaseModel | null>
}

export const IUpdatePostRepositoryToken = 'IUpdatePostRepositoryToken'