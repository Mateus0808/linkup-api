import { CreateCommentParams } from "src/app/interfaces/comment/create-comment-service.interface";
import { CommentDatabaseModel } from "../models/comment.model";
import { GetUserResponse } from "src/app/interfaces/user/get-user-by-param-service.interface";

export interface CreateCommentRepositoryParams extends Omit<CreateCommentParams, 'userId'> {
  user: GetUserResponse
}

export interface ICreateCommentRepository {
  create: (
    createCommentRepositoryParams: CreateCommentRepositoryParams,
  ) => Promise<CommentDatabaseModel | null>
}

export const ICreateCommentRepositoryToken = 'ICreateCommentRepositoryToken'