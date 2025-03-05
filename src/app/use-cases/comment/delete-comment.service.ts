import { Inject, Injectable } from "@nestjs/common";
import { NotFoundError } from "src/app/errors/not-found-error";
import { UnauthorizedError } from "src/app/errors/unauthorized-error";
import { DeleteCommentParams, DeleteCommentServiceResponse, IDeleteCommentService } from "src/app/interfaces/comment/delete-comment-service.interface";
import { IGetCommentService, IGetCommentServiceToken } from "src/app/interfaces/comment/get-comment-service.interface";
import { IGetPostService, IGetPostServiceToken } from "src/app/interfaces/post/get-post-service.interface";
import { IDeleteCommentRepository, IDeleteCommentRepositoryToken } from "src/app/ports/repositories/comment/delete-comment-repository.interface";

@Injectable()
export class DeleteCommentService implements IDeleteCommentService {
  constructor(
    @Inject(IDeleteCommentRepositoryToken)
    private readonly deleteCommentRepo: IDeleteCommentRepository,
    @Inject(IGetCommentServiceToken)
    private readonly getCommentService: IGetCommentService,
    @Inject(IGetPostServiceToken)
    private readonly getPostService: IGetPostService
  ) {}

  async execute(deleteCommentParams: DeleteCommentParams): Promise<DeleteCommentServiceResponse> {
    const { commentId, userId } = deleteCommentParams

    const comment = await this.getCommentService.execute(commentId);
    console.log("alo mundooo", comment)
    const post = await this.getPostService.execute(comment.postId);
    if (!post) {
      throw new NotFoundError('Post associado ao comentário não encontrado');
    }
    if (comment.user.id !== userId && post.user.id !== userId) {
      throw new UnauthorizedError('Você não tem permissão para excluir este comentário.');
    }

    await this.deleteCommentRepo.delete(commentId)

    return {
      message: 'Comentário excluído com sucesso.',
      success: true,
    };
  }
}