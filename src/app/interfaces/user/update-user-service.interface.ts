import { UpdateUserDto } from "src/app/dtos/user/update-user.dto";
import { GetUserResponse } from "./get-user-by-param-service.interface";

export interface UpdateUserParams extends Partial<UpdateUserDto> {}

export interface IUpdateUserService {
  execute: (userId: string, updateUserDto: UpdateUserParams) => Promise<GetUserResponse>
}

export const IUpdateUserServiceToken = 'IUpdateUserServiceToken'