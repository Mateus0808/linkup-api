import { UserEntity } from "src/domain/entities/user-entity"

export interface UserDatabaseModel extends UserEntity {
  id: string
  createdAt: Date
  updatedAt: Date
}