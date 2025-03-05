import { Inject, Injectable } from "@nestjs/common";
import { UnauthorizedError } from "src/app/errors/unauthorized-error";
import { IGetCommentService, IGetCommentServiceToken } from "src/app/interfaces/comment/get-comment-service.interface";
import { IUpdateCommentService, UpdateCommentServiceParams, UpdateCommentServiceResponse } from "src/app/interfaces/comment/update-comment-service.interface";
import { IUpdateCommentRepository, IUpdateCommentRepositoryToken } from "src/app/ports/repositories/comment/update-comment-repository.interface";

@Injectable()
export class UpdateCommentService implements IUpdateCommentService {
  constructor(
    @Inject(IUpdateCommentRepositoryToken)
    private readonly updateCommentRepo: IUpdateCommentRepository,
    @Inject(IGetCommentServiceToken)
    private readonly getCommentService: IGetCommentService,
  ) {}
  async execute (commentParams: UpdateCommentServiceParams): Promise<UpdateCommentServiceResponse> {
    const { commentId, userId, description } = commentParams

    const comment = await this.getCommentService.execute(commentId);

    if (comment.user.id !== userId) {
      throw new UnauthorizedError('Você não tem permissão para atualizar este comentário.');
    }

    await this.updateCommentRepo.update({ commentId, description });

    const updatedComment = await this.getCommentService.execute(commentId);

    return updatedComment
  }
}