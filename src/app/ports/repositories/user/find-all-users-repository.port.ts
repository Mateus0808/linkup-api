import { UserDatabaseModel } from "../models/user.model"

interface FindAllUsersFilters {
  name?: string
  username?: string
}

export interface FindAllUsersRepositoryParams {
  page: number
  limit: number,
  filters: FindAllUsersFilters
}

export interface FindAllUsersRepositoryResponse {
  data: UserDatabaseModel[]
  total: number
}

export interface IFindAllUsersRepository {
  findAll: (params: FindAllUsersRepositoryParams) => Promise<FindAllUsersRepositoryResponse>
}

export const IFindAllUsersRepositoryToken = 'IFindAllUsersRepositoryToken'