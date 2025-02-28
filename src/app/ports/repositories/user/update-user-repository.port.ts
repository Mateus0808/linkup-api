import { UpdateUserDto } from "src/app/dtos/user/update-user.dto";
import { UserDatabaseModel } from "../models/user.model";

export interface UpdateUserRepoParams extends Partial<UpdateUserDto> {}

export interface IUpdateUserRepository {
  update: (userId: string, data: UpdateUserRepoParams) => Promise<UserDatabaseModel | null>
}

export const IUpdateUserRepositoryToken = 'IUpdateUserRepositoryToken'