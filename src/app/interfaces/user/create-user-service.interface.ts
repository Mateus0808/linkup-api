import { CreateUserDto } from "src/app/dtos/user/create-user.dto"
import { UserDatabaseModel } from "src/app/ports/repositories/models/user.model"

export interface CreateUserParams extends CreateUserDto {}

export interface CreateUserReponse extends Omit<UserDatabaseModel, 'password'> {}

export interface ICreateUserService {
  createUser: (params: CreateUserParams) => Promise<CreateUserReponse>
}

export const ICreateUserServiceToken = 'ICreateUserServiceToken'