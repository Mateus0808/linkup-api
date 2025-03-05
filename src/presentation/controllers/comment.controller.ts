import { Body, Controller, Delete, Inject, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { CreateCommentParams, ICreateCommentService, ICreateCommentServiceToken } from 'src/app/interfaces/comment/create-comment-service.interface';
import { Request } from 'express'
import { IDeleteCommentService, IDeleteCommentServiceToken } from 'src/app/interfaces/comment/delete-comment-service.interface';
import { IUpdateCommentService, IUpdateCommentServiceToken } from 'src/app/interfaces/comment/update-comment-service.interface';
import { AuthGuard } from 'src/commom/guards/access-token.guard';
import { CreateCommentDto } from 'src/app/dtos/comment/create-comment.dto';

@UseGuards(AuthGuard)
@Controller('comments')
export class CommentController {
  constructor(
    @Inject(ICreateCommentServiceToken)
    private readonly createCommentService: ICreateCommentService,
    @Inject(IDeleteCommentServiceToken)
    private readonly deleteCommentService: IDeleteCommentService,
    @Inject(IUpdateCommentServiceToken)
    private readonly updateCommentService: IUpdateCommentService
  ) {}

  @Post()
  async createComment(
    @Req() req: Request,
    @Body() createCommentDto: CreateCommentDto
  ) {
    const userId = req.user.sub
    return await this.createCommentService.execute({ 
      userId, ...createCommentDto
    });
  }

  @Delete(':commentId')
  async deleteComment(
    @Param('commentId') commentId: string,
    @Req() req: Request,
  ) {
    const userId = req.user.sub;
    return await this.deleteCommentService.execute({
      commentId, userId
    });
  }

  @Put(':commentId')
  async updateComment(
    @Param('commentId') commentId: string,
    @Body('description') description: string,
    @Req() req: Request,
  ) {
    const userId = req.user.sub;

    return await this.updateCommentService.execute({
      commentId, userId, description
    });
  }
}