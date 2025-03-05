import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IUpdateUserRepository, IUpdateUserRepositoryToken } from 'src/app/ports/repositories/user/update-user-repository.port';
import { IGetUserByParamService, IGetUserByParamServiceToken } from 'src/app/interfaces/user/get-user-by-param-service.interface';

import { IUnfollowUserService, UnFollowUserParams, UnfollowUserServiceResponse } from 'src/app/interfaces/user/unfollow-user-service.interface';

@Injectable()
export class UnfollowUserService implements IUnfollowUserService {
  constructor(
    @Inject(IUpdateUserRepositoryToken)
    private readonly userRepository: IUpdateUserRepository,
    @Inject(IGetUserByParamServiceToken)
    private readonly getUserService: IGetUserByParamService,
  ) {}

  async execute(
    params: UnFollowUserParams,
  ): Promise<UnfollowUserServiceResponse> {
    const { currentUserId, userId } = params;

    if (currentUserId === userId) {
      throw new ConflictException('Usuário não pode deixar de seguir ele mesmo');
    }

    const currentUser = await this.getUserService.execute({ id: currentUserId })
    const userToUnfollow = await this.getUserService.execute({ id: userId });

    if (!currentUser.followings || !currentUser.followings.includes(userId)) {
      return {
        message: 'Você não segue este usuário.',
        success: false,
      };
    }

    const updatedFollowings = currentUser.followings.filter(
      (id) => id !== userId,
    );

    await this.userRepository.update(currentUserId, {
      followings: updatedFollowings,
    });

    const updatedFollowers = userToUnfollow.followers
      ? userToUnfollow.followers.filter((id) => id !== currentUserId)
      : [];

    await this.userRepository.update(userId, {
      followers: updatedFollowers,
    });

    return {
      message: 'Usuário deixado de seguir com sucesso.',
      success: true,
    };
  }
}