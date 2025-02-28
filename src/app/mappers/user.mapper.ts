import { GetUserResponse } from "../interfaces/user/get-user-by-param-service.interface";
import { UserDatabaseModel } from "../ports/repositories/models/user.model";

export const mapToUserResponseDto = (user: Partial<UserDatabaseModel>): GetUserResponse => ({
  id: user.id,
  name: user.name,
  username: user.username,
  email: user.email,
  phone: user.phone,
  birthDate: user.birthDate,
  gender: user.gender,
  maritalStatus: user.maritalStatus,
  followers: user.followers,
  followings: user.followings,
  status: user.status,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});