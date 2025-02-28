import { UserPageOptionsDto } from "src/app/dtos/user/user-page-options.dto"
import { PageDto } from "src/commom/dtos/page.dto"
import { GetUserResponse } from "./get-user-by-param-service.interface"

export interface IFindUsersWithPaginationService {
  listUsers: (pageOptionsDto: UserPageOptionsDto) => Promise<PageDto<GetUserResponse>>
}

export const IFindUsersWithPaginationServiceToken = 'IFindUsersWithPaginationServiceToken'