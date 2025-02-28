import { UserDatabaseModel } from "src/app/ports/repositories/models/user.model"

export interface GetUserByParams extends Pick<UserDatabaseModel, "id" | "email" | "username"> {}

interface UserResponse extends Omit<UserDatabaseModel, 'password'> {}

export interface GetUserResponse extends Partial<UserResponse> {}

export interface IGetUserByParamService {
  execute: (param: Partial<GetUserByParams>) => Promise<GetUserResponse>
}

export const IGetUserByParamServiceToken = 'IGetUserByParamServiceToken'