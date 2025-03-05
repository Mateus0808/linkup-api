import { Inject, Injectable } from "@nestjs/common";
import { NotFoundError } from "src/app/errors/not-found-error";
import { GetCommentResponse, IGetCommentService } from "src/app/interfaces/comment/get-comment-service.interface";
import { mapToCommentResponseDto } from "src/app/mappers/comment.mapper";
import { ILoadCommentRepository, ILoadCommentRepositoryToken } from "src/app/ports/repositories/comment/get-comment-repository.interface";

@Injectable()
export class GetCommentService implements IGetCommentService {
  constructor(
    @Inject(ILoadCommentRepositoryToken)
    private readonly loadCommentRepo: ILoadCommentRepository
  ) {}

  async  execute (commentId: string): Promise<GetCommentResponse> {
    const comment = await this.loadCommentRepo.findOne(commentId)
    if (!comment) throw new NotFoundError('Comentário não encontrado')

    return mapToCommentResponseDto(comment)
  }
}