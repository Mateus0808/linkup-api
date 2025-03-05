import { InjectRepository } from "@nestjs/typeorm"
import { CreateCommentRepositoryParams, ICreateCommentRepository } from "src/app/ports/repositories/comment/create-comment-repository.interface"
import { Comment } from "../pg/comment.entity"
import { CommentDatabaseModel } from "src/app/ports/repositories/models/comment.model"
import { Injectable } from "@nestjs/common"
import { Repository } from "typeorm"
import { IDeleteCommentRepository } from "src/app/ports/repositories/comment/delete-comment-repository.interface"
import { IUpdateCommentRepository, UpdateCommentRepositoryParams, UpdateCommentRepositoryResponse } from "src/app/ports/repositories/comment/update-comment-repository.interface"
import { GetCommentRepositoryResponse, ILoadCommentRepository } from "src/app/ports/repositories/comment/get-comment-repository.interface"

@Injectable()
export class CommentRepository implements 
  ICreateCommentRepository,
  IDeleteCommentRepository,
  ILoadCommentRepository,
  IUpdateCommentRepository
{
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>
  ) {}

  async create (
    createCommentRepositoryParams: CreateCommentRepositoryParams
  ): Promise<CommentDatabaseModel | null> {
    const { description, postId, user } = createCommentRepositoryParams
    const comment = this.commentRepository.create({ 
      user,
      post: { id: postId },
      description
    })

    const savedComment = await this.commentRepository.save(comment)
    if (!savedComment) return null

    return savedComment
  }

  async findOne(commentId: string): Promise<GetCommentRepositoryResponse | null> {
    const comment = await this.commentRepository.findOne({
      where: { id: commentId }, relations: ['user', 'post']
    })
    if (!comment) return null

    return comment
  }

  async update (
    commentParams: UpdateCommentRepositoryParams
  ): Promise<boolean | null> {
    const { commentId, description } = commentParams
    
    const comment = await this.commentRepository.update(commentId, {
      description
    })
    if (comment.affected === 0) return null

    return true
  }

  async delete(commentId: string): Promise<boolean | null> {
    const comment = await this.commentRepository.delete(commentId)
    if (comment.affected === 0) return null

    return true
  }
}