import { UserEntity } from "./user-entity"

export interface CommentEntity {
  user: UserEntity
  comment: string
  likes: Array<string>
}