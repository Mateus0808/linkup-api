
import { UpdatePostDto } from "src/app/dtos/post/update-post.dto";
import { GetPostResponse } from "./get-post-service.interface";

export interface UpdatePostParams extends Partial<UpdatePostDto> {}

export interface IUpdatePostService {
  execute: (userId: string, postId: string, updatePostDto: UpdatePostParams) => Promise<GetPostResponse>
}

export const IUpdatePostServiceToken = 'IUpdatePostServiceToken'