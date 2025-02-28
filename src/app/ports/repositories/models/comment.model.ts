import { CommentEntity } from "src/domain/entities/comment-entity";
import { UserDatabaseModel } from "./user.model";

export interface CommentDatabaseModel extends Omit<CommentEntity, "user"> {
  id: string
  user: UserDatabaseModel
  createdAt: Date
  updatedAt: Date
}