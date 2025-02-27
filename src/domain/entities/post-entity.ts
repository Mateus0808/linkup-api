import { CommentEntity } from "./comment-entity"
import { UserEntity } from "./user-entity"

export interface PostEntity {
  user: UserEntity
  title: string
  content: string
  likes: Array<string>
  comments: Array<CommentEntity>
}
