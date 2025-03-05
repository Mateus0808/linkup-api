import { GetPostResponse } from "../interfaces/post/get-post-service.interface";
import { PostDatabaseModel } from "../ports/repositories/models/post.model";
import { mapToCommentResponseDto } from "./comment.mapper";
import { mapToUserResponseDto } from "./user.mapper";

export const mapToPostResponseDto = (post: PostDatabaseModel): GetPostResponse => ({
  id: post.id,
  title: post.title,
  description: post.description,
  imageUrl: post.imageUrl,
  user: mapToUserResponseDto({
    id: post.user.id,
    name: post.user.name,
    username: post.user.username,
    email: post.user.email,
    createdAt: post.user.createdAt,
  }),
  likes: post.likes,
  comments: post.comments.map(comment => mapToCommentResponseDto({ post, ...comment})),
  createdAt: post.createdAt,
  updatedAt: post.updatedAt,
});
