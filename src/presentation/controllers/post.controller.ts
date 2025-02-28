import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { CreatePostDto } from "src/app/dtos/post/create-post.dto";
import { ICreatePostService, ICreatePostServiceToken } from "src/app/interfaces/post/create-post-service-interface";
import { IDeletePostService, IDeletePostServiceToken } from "src/app/interfaces/post/delete-post-service-interface";
import { IGetPostService, IGetPostServiceToken } from "src/app/interfaces/post/get-post-service.interface";
import { AccessTokenGuard } from "src/commom/guards/access-token.guard";

@UseGuards(AccessTokenGuard)
@Controller('posts')
export class PostController {
  constructor(
    @Inject(ICreatePostServiceToken)
    private readonly createPostService: ICreatePostService,
    @Inject(IGetPostServiceToken)
    private readonly getPostService: IGetPostService,
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

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.deletePostService.execute(id);
  }
}