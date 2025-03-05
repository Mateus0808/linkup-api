
import { Inject, Injectable } from "@nestjs/common"
import { UnauthorizedError } from "src/app/errors/unauthorized-error"
import { DeletePostServiceResponse, IDeletePostService } from "src/app/interfaces/post/delete-post-service.interface"
import { IGetPostService, IGetPostServiceToken } from "src/app/interfaces/post/get-post-service.interface"
import { IDeletePostRepository, IDeletePostRepositoryToken } from "src/app/ports/repositories/post/delete-post-repository-interface"

@Injectable()
export class DeletePostService implements IDeletePostService {
  constructor(
    @Inject(IDeletePostRepositoryToken)
    private readonly postRepository: IDeletePostRepository,
    @Inject(IGetPostServiceToken)
    private readonly getPost: IGetPostService
  ) {}

  async execute(userId: string, postId: string): Promise<DeletePostServiceResponse> {
    const post = await this.getPost.execute(postId)
    if (post.user.id !== userId) {
      throw new UnauthorizedError("Você não tem permissão para deletar este post");
    }

    await this.postRepository.delete(postId)
    
    return {
      message: 'Post deletado com sucesso',
      success: true,
    }
  }
}
