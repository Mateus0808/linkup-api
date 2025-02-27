import { CreateUserParams } from 'src/app/interfaces/user/create-user-service.interface'
import { UserDatabaseModel } from '../models/user.model'

export interface CreateUserRepositoryParams extends CreateUserParams {}

export interface ICreateUserRepository {
  createUser: (params: CreateUserRepositoryParams) => Promise<UserDatabaseModel | null>
}

export const ICreateUserRepositoryToken = 'ICreateUserRepositoryToken'