import { CreateUserDto } from "src/app/dtos/user/create-user.dto"
import { GetUserResponse } from "./get-user-by-param-service.interface"

export interface CreateUserParams extends CreateUserDto {}

export interface CreateUserReponse extends GetUserResponse {}

export interface ICreateUserService {
  createUser: (params: CreateUserParams) => Promise<CreateUserReponse>
}

export const ICreateUserServiceToken = 'ICreateUserServiceToken'