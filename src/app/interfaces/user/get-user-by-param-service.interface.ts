import { UserDatabaseModel } from "src/app/ports/repositories/models/user.model"

export interface GetUserByParams extends Pick<UserDatabaseModel, "id" | "email" | "username"> {}

export interface UserResponse extends Omit<UserDatabaseModel, 'password'> {}


export interface IGetUserByParamService {
  execute: (param: Partial<GetUserByParams>) => Promise<UserResponse>
}

export const IGetUserByParamServiceToken = 'IGetUserByParamServiceToken'