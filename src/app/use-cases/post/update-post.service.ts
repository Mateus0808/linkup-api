import { Inject, Injectable } from "@nestjs/common";
import { BadRequestError } from "src/app/errors/bad-request-error";
import { UnauthorizedError } from "src/app/errors/unauthorized-error";
import { GetPostResponse, IGetPostService, IGetPostServiceToken } from "src/app/interfaces/post/get-post-service.interface";
import { IUpdatePostService, UpdatePostParams } from "src/app/interfaces/post/update-post-service.interface";
import { mapToPostResponseDto } from "src/app/mappers/post.mapper";
import { IUpdatePostRepository, IUpdatePostRepositoryToken } from "src/app/ports/repositories/post/update-user-repository.port";

@Injectable()
export class UpdatePostService implements IUpdatePostService {
  constructor(
    @Inject(IUpdatePostRepositoryToken)
    private readonly updatePostRepository: IUpdatePostRepository,
    @Inject(IGetPostServiceToken)
    private readonly getPost: IGetPostService
  ) {}

  async execute (
    userId: string, postId: string, updatePostDto: UpdatePostParams
  ): Promise<GetPostResponse> {
    const post = await this.getPost.execute(postId)
    if (post.user.id !== userId) {
      throw new UnauthorizedError("Você não tem permissão para editar este post");
    }

    const updatedUser = await this.updatePostRepository.update(postId, updatePostDto)
    if (!updatedUser) throw new BadRequestError('Erro ao atualizar dados do usuário')

    return mapToPostResponseDto(updatedUser)
  }
}