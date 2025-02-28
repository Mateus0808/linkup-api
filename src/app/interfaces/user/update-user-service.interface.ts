import { UpdateUserDto } from "src/app/dtos/user/update-user.dto";
import { UserResponse } from "./get-user-by-param-service.interface";

export interface UpdateUserParams extends Partial<UpdateUserDto> {}

export interface IUpdateUserService {
  execute: (userId: string, updateUserDto: UpdateUserParams) => Promise<UserResponse>
}

export const IUpdateUserServiceToken = 'IUpdateUserServiceToken'