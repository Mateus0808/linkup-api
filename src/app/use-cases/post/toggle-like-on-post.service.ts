import { Inject } from "@nestjs/common";
import { GetPostResponse, IGetPostService, IGetPostServiceToken } from "src/app/interfaces/post/get-post-service.interface";
import { IToggleLikeOnPostService, ToggleLikeParams } from "src/app/interfaces/post/toggle-like-on-post-service.interface";
import { IGetUserByParamService, IGetUserByParamServiceToken } from "src/app/interfaces/user/get-user-by-param-service.interface";
import { mapToPostResponseDto } from "src/app/mappers/post.mapper";
import { PostDatabaseModel } from "src/app/ports/repositories/models/post.model";
import { IUpdatePostRepository, IUpdatePostRepositoryToken } from "src/app/ports/repositories/post/update-user-repository.port";

export class ToggleLikeOnPostService implements IToggleLikeOnPostService {
  constructor(
    @Inject(IUpdatePostRepositoryToken)
    private readonly toggleLikePostRepo: IUpdatePostRepository,
    @Inject(IGetUserByParamServiceToken)
    private readonly getUserService: IGetUserByParamService,
    @Inject(IGetPostServiceToken)
    private readonly getPostService: IGetPostService
  ) {}

  async execute(params: ToggleLikeParams): Promise<GetPostResponse> {
    const { postId, userId } = params
    const user = await this.getUserService.execute({ 
      id: userId
    })
    const post = await this.getPostService.execute(postId)

    const hasUserLiked = post.likes.some((like) => like.toString() === userId);

    let updatedPost: PostDatabaseModel

    if (hasUserLiked) {
      updatedPost = await this.toggleLikePostRepo.update(postId, {
        likes: post.likes.filter((like) => like.toString() !== userId),
      });
    } else {
      updatedPost = await this.toggleLikePostRepo.update(postId, {
        likes: [...post.likes, userId],
      });
    }

    return mapToPostResponseDto(updatedPost);
  }
}