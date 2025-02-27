import { Body, Controller, Inject, Post } from "@nestjs/common";
import { CreateUserDto } from "src/app/dtos/user/create-user.dto";
import { ICreateUserService, ICreateUserServiceToken } from "src/app/interfaces/user/create-user-service.interface";

@Controller('users')
export class UserController {
  constructor(
    @Inject(ICreateUserServiceToken)
    private readonly createUserService: ICreateUserService,
  ) {}

  @Post()
  async createUser(@Body() params: CreateUserDto) {
    return await this.createUserService.createUser(params);
  }
}