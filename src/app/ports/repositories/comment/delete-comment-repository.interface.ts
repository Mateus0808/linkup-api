export interface IDeleteCommentRepository {
  delete(commentId: string): Promise<boolean | null>
}

export const IDeleteCommentRepositoryToken = 'IDeleteCommentRepositoryToken'