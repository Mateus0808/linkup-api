import { Inject, Injectable } from "@nestjs/common";
import { BadRequestError } from "src/app/errors/bad-request-error";
import { CreateCommentParams, CreateCommentResponse, ICreateCommentService } from "src/app/interfaces/comment/create-comment-service.interface";
import { IGetCommentService, IGetCommentServiceToken } from "src/app/interfaces/comment/get-comment-service.interface";
import { IGetPostService, IGetPostServiceToken } from "src/app/interfaces/post/get-post-service.interface";
import { IGetUserByParamService, IGetUserByParamServiceToken } from "src/app/interfaces/user/get-user-by-param-service.interface";
import { mapToCommentResponseDto } from "src/app/mappers/comment.mapper";
import { ICreateCommentRepository, ICreateCommentRepositoryToken } from "src/app/ports/repositories/comment/create-comment-repository.interface";

@Injectable()
export class CreateCommentService implements ICreateCommentService {
  constructor(
    @Inject(ICreateCommentRepositoryToken)
    private readonly createCommentRepo: ICreateCommentRepository,
    @Inject(IGetPostServiceToken)
    private readonly getPostService: IGetPostService,
    @Inject(IGetUserByParamServiceToken)
    private readonly getUserService: IGetUserByParamService
  ) {}

  async execute (createCommentParams: CreateCommentParams): Promise<CreateCommentResponse> {
    const { userId, postId, description } = createCommentParams;

    await this.getPostService.execute(postId)
    const user = await this.getUserService.execute({
      id: userId
    })
    
    const createdComment = await this.createCommentRepo.create({
      description,
      postId,
      user
    })
    if (!createdComment) throw new BadRequestError('Erro ao adicionar comentário')
    
    return mapToCommentResponseDto(createdComment)
  }
}