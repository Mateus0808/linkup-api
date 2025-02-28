import { Body, Controller, Get, Inject, Param, Post, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "src/app/dtos/user/create-user.dto";
import { ICreateUserService, ICreateUserServiceToken } from "src/app/interfaces/user/create-user-service.interface";
import { IGetUserByParamService, IGetUserByParamServiceToken, UserResponse } from "src/app/interfaces/user/get-user-by-param-service.interface";
import { AccessTokenGuard } from "src/commom/guards/access-token.guard";

@Controller('users')
export class UserController {
  constructor(
    @Inject(ICreateUserServiceToken)
    private readonly createUserService: ICreateUserService,
    @Inject(IGetUserByParamServiceToken)
    private readonly getUserService: IGetUserByParamService,
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
}