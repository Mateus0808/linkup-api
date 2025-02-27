import { UserDatabaseModel } from "../models/user.model"

export interface LoadUserByParam extends Pick<UserDatabaseModel, "id" | "email" | "username"> {}

export interface ILoadUserByParamRepository {
  findOne: (param: Partial<LoadUserByParam>) => Promise<UserDatabaseModel | null>
}

export const ILoadUserByParamRepositoryToken = 'ILoadUserByParamRepositoryToken'