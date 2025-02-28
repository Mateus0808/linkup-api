import { UserEntity } from "./user-entity"

export interface PostEntity {
  user: UserEntity
  title: string
  description: string
}
