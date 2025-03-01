import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { CreatePostDto } from "src/app/dtos/post/create-post.dto";
import { PostPageOptionsDto } from "src/app/dtos/post/post-page-options.dto";
import { ICreatePostService, ICreatePostServiceToken } from "src/app/interfaces/post/create-post-service.interface";
import { IDeletePostService, IDeletePostServiceToken } from "src/app/interfaces/post/delete-post-service.interface";
import { IGetPostService, IGetPostServiceToken } from "src/app/interfaces/post/get-post-service.interface";
import { IGetUserPostsService, IGetUserPostsServiceToken } from "src/app/interfaces/post/get-user-posts-service.interface";
import { GetUserResponse } from "src/app/interfaces/user/get-user-by-param-service.interface";
import { PageDto } from "src/commom/dtos/page.dto";
import { AccessTokenGuard } from "src/commom/guards/access-token.guard";

@UseGuards(AccessTokenGuard)
@Controller('posts')
export class PostController {
  constructor(
    @Inject(ICreatePostServiceToken)
    private readonly createPostService: ICreatePostService,
    @Inject(IGetPostServiceToken)
    private readonly getPostService: IGetPostService,
    @Inject(IGetUserPostsServiceToken)
    private readonly getUserPostsService: IGetUserPostsService,
    @Inject(IDeletePostServiceToken)
    private readonly deletePostService: IDeletePostService,
  ) {}

  @Post()
  async createUser(@Body() params: CreatePostDto) {
    return await this.createPostService.execute(params);
  }

  @Get(':id')
  async get(@Param('id') postId: string) {
    return await this.getPostService.execute(postId);
  }

  @Get('user/:userId')
  async findUserPosts(
    @Param('userId') userId: string,
    @Query() pageOptionsDto: PostPageOptionsDto,
  ): Promise<PageDto<GetUserResponse>> {
    return await this.getUserPostsService.execute(userId, pageOptionsDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.deletePostService.execute(id);
  }
}