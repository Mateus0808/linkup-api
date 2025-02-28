import { Inject, Injectable } from "@nestjs/common";
import { UserPageOptionsDto } from "src/app/dtos/user/user-page-options.dto";
import { GetUserResponse } from "src/app/interfaces/user/get-user-by-param-service.interface";
import { IFindUsersWithPaginationService } from "src/app/interfaces/user/list-users-service.interface";
import { mapToUserResponseDto } from "src/app/mappers/user.mapper";
import { IFindAllUsersRepository, IFindAllUsersRepositoryToken } from "src/app/ports/repositories/user/find-all-users-repository.port";
import { PageMetaDto } from "src/commom/dtos/page-meta.dto";
import { PageDto } from "src/commom/dtos/page.dto";
import { generatePaginationLinks } from "src/commom/utils/generate-pagination-links.util";


@Injectable()
export class FindUsersWithPaginationService implements IFindUsersWithPaginationService {
  constructor(
    @Inject(IFindAllUsersRepositoryToken)
    private readonly userRepository: IFindAllUsersRepository
  ) {}

  async listUsers(pageOptionsDto: UserPageOptionsDto): Promise<PageDto<GetUserResponse>> {
    const { limit, page, name, username } = pageOptionsDto

    const filters = this.createFilters(name, username);

    const { data, total } = await this.userRepository.findAll({
      limit, page, filters
    });

    const mappedData = data.map(mapToUserResponseDto);
    const links = generatePaginationLinks('users', page, limit, total);

    const pageMetaDto = new PageMetaDto({ itemCount: total, pageOptionsDto, links: links });

    return new PageDto(mappedData, pageMetaDto);
  }

  private createFilters(name?: string, username?: string) {
    const filters: { name?: string, username?: string } = {};

    if (name) filters.name = name;
    if (username) filters.username = username;

    return filters;
  }
}