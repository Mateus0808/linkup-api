import { EnumGender } from "../enum/user-gender.enum"
import { EnumUserStatus } from "../enum/user-status.enum"

export interface UserEntity {
  name: string
  username: string
  email: string
  birthDate: Date
  maritalStatus: string
  phone: string
  gender: EnumGender
  followers: Array<string>
  followings: Array<string>
  password: string
  status: EnumUserStatus
}
