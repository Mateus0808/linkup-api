import { UserPageOptionsDto } from "src/app/dtos/user/user-page-options.dto"
import { PageDto } from "src/commom/dtos/page.dto"
import { UserResponse } from "./get-user-by-param-service.interface"

export interface IFindUsersWithPaginationService {
  listUsers: (pageOptionsDto: UserPageOptionsDto) => Promise<PageDto<UserResponse>>
}

export const IFindUsersWithPaginationServiceToken = 'IFindUsersWithPaginationServiceToken'