import { GetPostResponse } from "./get-post-service.interface"

export interface ToggleLikeParams {
  userId: string
  postId: string
}

export interface IToggleLikeOnPostService {
  execute (params: ToggleLikeParams): Promise<GetPostResponse>
}

export const IToggleLikeOnPostServiceToken = 'IToggleLikeOnPostServiceToken'
