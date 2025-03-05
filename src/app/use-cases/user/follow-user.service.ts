import { ConflictException, Inject, Injectable } from '@nestjs/common'
import { IUpdateUserRepository, IUpdateUserRepositoryToken } from 'src/app/ports/repositories/user/update-user-repository.port'
import { IGetUserByParamService, IGetUserByParamServiceToken } from 'src/app/interfaces/user/get-user-by-param-service.interface'
import { FollowUserParams, FollowUserServiceResponse, IFollowUserService } from 'src/app/interfaces/user/follow-user-service.interface'
import { BadRequestError } from 'src/app/errors/bad-request-error'
import { mapToUserResponseDto } from 'src/app/mappers/user.mapper'

@Injectable()
export class FollowUserService implements IFollowUserService {
  constructor(
    @Inject(IUpdateUserRepositoryToken)
    private readonly userRepository: IUpdateUserRepository,
    @Inject(IGetUserByParamServiceToken)
    private readonly getUserService: IGetUserByParamService,
  ) {}

  async execute(
    params: FollowUserParams,
  ): Promise<FollowUserServiceResponse> {
    const { currentUserId, userId } = params

    if (currentUserId === userId) throw new ConflictException('Usuário não pode seguir ele mesmo')

    const currentUser = await this.getUserService.execute({ id: currentUserId })
    const userToFollow  = await this.getUserService.execute({ id: userId })
    
    if (currentUser.followings && currentUser.followings.includes(userId)) {
      return currentUser
    }

    const updatedFollowings = currentUser.followings
      ? [...currentUser.followings, userId] 
      : [userId];

    const response = await this.userRepository.update(currentUserId, {
      followings: updatedFollowings
    })

    const updatedFollowers = userToFollow.followers
      ? [...userToFollow.followers, currentUserId]
      : [currentUserId];

    await this.userRepository.update(userId, { followers: updatedFollowers });

    if (!response) throw new BadRequestError('Falha ao atualizar a lista de seguidores')

    return mapToUserResponseDto(response)
  }
}