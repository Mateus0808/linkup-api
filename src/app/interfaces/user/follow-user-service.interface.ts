import { GetUserResponse } from "./get-user-by-param-service.interface"

export interface FollowUserParams {
  currentUserId: string
  userId: string
}

export interface FollowUserServiceResponse extends GetUserResponse {}

export interface IFollowUserService {
  execute: (
    params: FollowUserParams,
  ) => Promise<FollowUserServiceResponse>
}

export const IFollowUserServiceToken = 'IFollowUserServiceToken'