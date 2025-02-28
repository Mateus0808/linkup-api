import { PostDatabaseModel } from 'src/app/ports/repositories/models/post.model'
import { GetUserResponse } from '../user/get-user-by-param-service.interface'


export interface GetPostResponse extends Omit<PostDatabaseModel, "user"> {
  user: GetUserResponse
}

export interface IGetPostService {
  execute: (postId: string) => Promise<GetPostResponse>
}

export const IGetPostServiceToken = 'IGetPostServiceToken'
