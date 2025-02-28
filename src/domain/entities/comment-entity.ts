import { UserEntity } from "./user-entity"

export interface CommentEntity {
  user: UserEntity
  description: string
}