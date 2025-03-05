import { Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { CreateUserDto } from "src/app/dtos/user/create-user.dto";
import { UpdateUserDto } from "src/app/dtos/user/update-user.dto";
import { UserPageOptionsDto } from "src/app/dtos/user/user-page-options.dto";
import { ICreateUserService, ICreateUserServiceToken } from "src/app/interfaces/user/create-user-service.interface";
import { IFollowUserService, IFollowUserServiceToken } from "src/app/interfaces/user/follow-user-service.interface";
import { GetUserResponse, IGetUserByParamService, IGetUserByParamServiceToken } from "src/app/interfaces/user/get-user-by-param-service.interface";
import { IFindUsersWithPaginationService, IFindUsersWithPaginationServiceToken } from "src/app/interfaces/user/list-users-service.interface";
import { IUnfollowUserService, IUnfollowUserServiceToken } from "src/app/interfaces/user/unfollow-user-service.interface";
import { IUpdateUserService, IUpdateUserServiceToken } from "src/app/interfaces/user/update-user-service.interface";
import { IUserTimelineService, IUserTimelineServiceToken } from "src/app/interfaces/user/user-timeline-service.interface";
import { PageOptionsDto } from "src/commom/dtos/page-options.dto";
import { PageDto } from "src/commom/dtos/page.dto";
import { AuthGuard } from "src/commom/guards/access-token.guard";

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
    @Inject(IFollowUserServiceToken)
    private readonly followUserService: IFollowUserService,
    @Inject(IUnfollowUserServiceToken)
    private readonly unfollowUserService: IUnfollowUserService,
    @Inject(IUserTimelineServiceToken)
    private readonly userTimelineService: IUserTimelineService
  ) {}

  @Post()
  async createUser(@Body() params: CreateUserDto) {
    return await this.createUserService.createUser(params);
  }

  @UseGuards(AuthGuard)
  @Get('timeline')
  async getUserTimeline(
    @Req() req: Request,
    @Query() pageOptionsDto: PageOptionsDto,
  ) {
    const userId = req.user.sub
    console.log("netrou aqui", userId)
    return await this.userTimelineService.execute(userId, pageOptionsDto);
  }
  
  @UseGuards(AuthGuard)
  @Get(':id')
  async get(@Param('id') userId: string): Promise<GetUserResponse> {
    return await this.getUserService.execute({ id: userId });
  }

  @UseGuards(AuthGuard)
  @Get()
  async findUsers(
    @Query() pageOptionsDto: UserPageOptionsDto,
  ): Promise<PageDto<GetUserResponse>> {
    return await this.findUsersService.listUsers(pageOptionsDto);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string, @Body() updateUserDto: UpdateUserDto
  ): Promise<GetUserResponse> {
    return await this.updateUserService.execute(id, updateUserDto);
  }

  @UseGuards(AuthGuard)
  @Post('follow/:userId')
  async followUser(
    @Req() req: Request,
    @Param('userId') userId: string
  ) {
    const currentUserId = req.user.sub
    return await this.followUserService.execute({
      currentUserId, userId
    });
  }

  @UseGuards(AuthGuard)
  @Delete('unfollow/:userId')
  async unfollowUser(
    @Req() req: Request,
    @Param('userId') userId: string
  ) {
    const currentUserId = req.user.sub
    return await this.unfollowUserService.execute({
      currentUserId,
      userId
    });
  }
}