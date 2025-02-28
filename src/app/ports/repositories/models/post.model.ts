import { PostEntity } from '../../../../domain/entities/post-entity'
import { CommentDatabaseModel } from './comment.model'
import { UserDatabaseModel } from './user.model'

export interface CreatePostDatabaseModel extends Omit<PostEntity, "user" > {
  id: string
  user: UserDatabaseModel
  createdAt: Date
  updatedAt: Date
}

export interface PostDatabaseModel extends Omit<PostEntity, "user"> {
  id: string
  user: UserDatabaseModel
  comments: CommentDatabaseModel[]
  createdAt: Date
  updatedAt: Date
}
