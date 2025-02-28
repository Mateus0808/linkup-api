export interface IDeletePostRepository {
  delete(postId: string): Promise<boolean>
}

export const IDeletePostRepositoryToken = 'IDeletePostRepositoryToken'