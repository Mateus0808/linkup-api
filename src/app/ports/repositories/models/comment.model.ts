import { CommentEntity } from "src/domain/entities/comment-entity";
import { UserDatabaseModel } from "./user.model";
import { PostDatabaseModel } from "./post.model";

export interface CommentDatabaseModel extends Omit<CommentEntity, "user" | "post"> {
  id: string
  user: UserDatabaseModel
  post: PostDatabaseModel
  createdAt: Date
  updatedAt: Date
}