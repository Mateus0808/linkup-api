import { GetCommentResponse } from "../interfaces/comment/get-comment-service.interface";
import { CommentDatabaseModel } from "../ports/repositories/models/comment.model";
import { mapToUserResponseDto } from "./user.mapper";

export const mapToCommentResponseDto = (comment: CommentDatabaseModel): GetCommentResponse => ({
  id: comment.id,
  description: comment.description,
  user: mapToUserResponseDto({
    id: comment.user?.id,
    name: comment.user?.name,
    username: comment.user?.username,
    email: comment.user?.email,
    createdAt: comment.user?.createdAt,
  }),
  postId: comment.post.id,
  createdAt: comment.createdAt,
  updatedAt: comment.updatedAt
});
