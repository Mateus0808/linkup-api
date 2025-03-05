export interface DeleteCommentParams {
  commentId: string
  userId: string
}

export interface DeleteCommentServiceResponse {
  message: string
  success: boolean
}

export interface IDeleteCommentService {
  execute(
    deleteCommentParams: DeleteCommentParams,
  ): Promise<DeleteCommentServiceResponse>
}

export const IDeleteCommentServiceToken = 'IDeleteCommentServiceToken'

