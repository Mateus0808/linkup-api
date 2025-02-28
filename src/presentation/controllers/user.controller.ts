import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "src/app/dtos/user/create-user.dto";
import { UpdateUserDto } from "src/app/dtos/user/update-user.dto";
import { UserPageOptionsDto } from "src/app/dtos/user/user-page-options.dto";
import { ICreateUserService, ICreateUserServiceToken } from "src/app/interfaces/user/create-user-service.interface";
import { IGetUserByParamService, IGetUserByParamServiceToken, UserResponse } from "src/app/interfaces/user/get-user-by-param-service.interface";
import { IFindUsersWithPaginationService, IFindUsersWithPaginationServiceToken } from "src/app/interfaces/user/list-users-service.interface";
import { IUpdateUserService, IUpdateUserServiceToken } from "src/app/interfaces/user/update-user-service.interface";
import { PageDto } from "src/commom/dtos/page.dto";
import { AccessTokenGuard } from "src/commom/guards/access-token.guard";

@Controller('users')
export class UserController {
  constructor(
    @Inject(ICreateUserServiceToken)
    private readonly createUserService: ICreateUserService,
    @Inject(IGetUserByParamServiceToken)
    private readonly getUserService: IGetUserByParamService,
    @Inject(IFindUsersWithPaginationServiceToken)
    private readonly findUsersService: IFindUsersWithPaginationService,
    @Inject(IUpdateUserServiceToken)
    private readonly updateUserService: IUpdateUserService,
  ) {}

  @Post()
  async createUser(@Body() params: CreateUserDto) {
    return await this.createUserService.createUser(params);
  }
  
  @UseGuards(AccessTokenGuard)
  @Get(':id')
  async get(@Param('id') userId: string): Promise<UserResponse> {
    return await this.getUserService.execute({ id: userId });
  }

  @Get()
  async findUsers(
    @Query() pageOptionsDto: UserPageOptionsDto,
  ): Promise<PageDto<UserResponse>> {
    return await this.findUsersService.listUsers(pageOptionsDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, @Body() updateUserDto: UpdateUserDto
  ): Promise<UserResponse> {
    return await this.updateUserService.execute(id, updateUserDto);
  }
}