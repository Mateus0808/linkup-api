import { Inject } from "@nestjs/common";
import { NotFoundError } from "src/app/errors/not-found-error";
import { GetPostResponse, IGetPostService } from "src/app/interfaces/post/get-post-service.interface";
import { mapToPostResponseDto } from "src/app/mappers/post.mapper";
import { ILoadPostRepository, ILoadPostRepositoryToken } from "src/app/ports/repositories/post/load-post-repository.interface";

export class GetPostService implements IGetPostService {
  constructor(
    @Inject(ILoadPostRepositoryToken)
    private readonly loadPostRepo: ILoadPostRepository
  ) {}

  async execute (postId: string): Promise<GetPostResponse> {
    const post = await this.loadPostRepo.findOne(postId)
    if (!post) throw new NotFoundError('Postagem não encontrada')

    return mapToPostResponseDto(post)
  }
}