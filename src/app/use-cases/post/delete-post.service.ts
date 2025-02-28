
import { Inject, Injectable } from "@nestjs/common"
import { NotFoundError } from "src/app/errors/not-found-error"
import { DeletePostServiceResponse, IDeletePostService } from "src/app/interfaces/post/delete-post-service-interface"
import { IDeletePostRepository, IDeletePostRepositoryToken } from "src/app/ports/repositories/post/delete-post-repository-interface"

@Injectable()
export class DeletePostService implements IDeletePostService {
  constructor(
    @Inject(IDeletePostRepositoryToken)
    private readonly postRepository: IDeletePostRepository
  ) {}

  async execute(postId: string): Promise<DeletePostServiceResponse> {
    const post = await this.postRepository.delete(postId)

    if (!post) throw new NotFoundError("Post não encontrado")
    
    return {
      message: 'Post deletado com sucesso',
      success: true,
    }
  }
}
