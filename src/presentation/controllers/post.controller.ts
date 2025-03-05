import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { CreatePostDto } from "src/app/dtos/post/create-post.dto";
import { PostPageOptionsDto } from "src/app/dtos/post/post-page-options.dto";
import { ICreatePostService, ICreatePostServiceToken } from "src/app/interfaces/post/create-post-service.interface";
import { IDeletePostService, IDeletePostServiceToken } from "src/app/interfaces/post/delete-post-service.interface";
import { GetPostResponse, IGetPostService, IGetPostServiceToken } from "src/app/interfaces/post/get-post-service.interface";
import { IGetUserPostsService, IGetUserPostsServiceToken } from "src/app/interfaces/post/get-user-posts-service.interface";
import { GetUserResponse } from "src/app/interfaces/user/get-user-by-param-service.interface";
import { PageDto } from "src/commom/dtos/page.dto";
import { Request} from 'express'
import { AuthGuard } from "src/commom/guards/access-token.guard";
import { IUpdatePostService, IUpdatePostServiceToken } from "src/app/interfaces/post/update-post-service.interface";
import { UpdatePostDto } from "src/app/dtos/post/update-post.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { IToggleLikeOnPostService, IToggleLikeOnPostServiceToken } from "src/app/interfaces/post/toggle-like-on-post-service.interface";
import { IGeneratePostsReportService, IGeneratePostsReportToken } from "src/app/interfaces/report/generate-posts-report.interface";

@UseGuards(AuthGuard)
@Controller('posts')
export class PostController {
  constructor(
    @Inject(ICreatePostServiceToken)
    private readonly createPostService: ICreatePostService,
    @Inject(IGetPostServiceToken)
    private readonly getPostService: IGetPostService,
    @Inject(IGetUserPostsServiceToken)
    private readonly getUserPostsService: IGetUserPostsService,
    @Inject(IUpdatePostServiceToken)
    private readonly updatePostsService: IUpdatePostService,
    @Inject(IDeletePostServiceToken)
    private readonly deletePostService: IDeletePostService,
    @Inject(IToggleLikeOnPostServiceToken)
    private readonly toggleLikePostService: IToggleLikeOnPostService,
    @Inject(IGeneratePostsReportToken)
    private readonly generateReportService: IGeneratePostsReportService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createUser(
    @UploadedFile() file: Express.Multer.File,
    @Body() params: CreatePostDto
  ) {
    const imageUrl = file ? `/uploads/${file.filename}` : null;
    return await this.createPostService.execute({ imageUrl, ...params });
  }

  @Get(':id')
  async get(@Param('id') postId: string) {
    return await this.getPostService.execute(postId);
  }

  @Get('/report/:userId')
  async generateReport(@Param('userId') userId: string) {
    return await this.generateReportService.execute({
      userId
    });
  }

  @Get('user/:username')
  async findUserPosts(
    @Param('username') username: string,
    @Query() pageOptionsDto: PostPageOptionsDto,
  ): Promise<PageDto<GetUserResponse>> {
    return await this.getUserPostsService.execute(
      { username }, pageOptionsDto
    );
  }

  @Patch(':postId')
  async update(
    @Req() req: Request,
    @Param('postId') postId: string, @Body() updatePostDto: UpdatePostDto
  ): Promise<GetPostResponse> {
    const userId = req.user.sub
    return await this.updatePostsService.execute(userId, postId, updatePostDto);
  }

  @Post('like/:postId')
  async toggleLike(
    @Req() req: Request,
    @Param('postId') postId: string,
  ): Promise<GetPostResponse> {
    const userId = req.user.sub
    return await this.toggleLikePostService.execute({
      postId, userId
    });
  }

  @Delete(':postId')
  async delete(@Param('postId') postId: string, @Req() req: Request) {
    const userId = req.user.sub
    return await this.deletePostService.execute(userId, postId);
  }
}