export interface DeletePostServiceResponse {
  success: boolean
  message: string
}

export interface IDeletePostService {
  execute: (userId: string, postId: string) => Promise<DeletePostServiceResponse>
}

export const IDeletePostServiceToken = 'IDeletePostServiceToken'
