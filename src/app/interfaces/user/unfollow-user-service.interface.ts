export interface UnFollowUserParams {
  currentUserId: string
  userId: string
}

export interface UnfollowUserServiceResponse {
  message: string
  success: boolean
}

export interface IUnfollowUserService {
  execute: (
    params: UnFollowUserParams,
  ) => Promise<UnfollowUserServiceResponse>
}

export const IUnfollowUserServiceToken = 'IUnfollowUserServiceToken'