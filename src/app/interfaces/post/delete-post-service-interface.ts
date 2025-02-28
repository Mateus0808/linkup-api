export interface DeletePostServiceResponse {
  success: boolean
  message: string
}

export interface IDeletePostService {
  execute: (id: string) => Promise<DeletePostServiceResponse>
}

export const IDeletePostServiceToken = 'IDeletePostServiceToken'
