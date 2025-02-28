import { Inject, Injectable } from "@nestjs/common";
import { AlreadyExistsError } from "src/app/errors/already-exists-error";
import { BadRequestError } from "src/app/errors/bad-request-error";
import { GetUserResponse, IGetUserByParamService, IGetUserByParamServiceToken } from "src/app/interfaces/user/get-user-by-param-service.interface";
import { IUpdateUserService, UpdateUserParams } from "src/app/interfaces/user/update-user-service.interface";
import { mapToUserResponseDto } from "src/app/mappers/user.mapper";
import { ILoadUserByParamRepository, ILoadUserByParamRepositoryToken } from "src/app/ports/repositories/user/load-user-by-param-repository.interface";
import { IUpdateUserRepository, IUpdateUserRepositoryToken } from "src/app/ports/repositories/user/update-user-repository.port";

@Injectable()
export class UpdateUserService implements IUpdateUserService {
  constructor(
    @Inject(IGetUserByParamServiceToken)
    private readonly getUserService: IGetUserByParamService,
    @Inject(IUpdateUserRepositoryToken)
    private readonly updateUserRepo: IUpdateUserRepository,
    @Inject(ILoadUserByParamRepositoryToken)
    private readonly loadUserRepo: ILoadUserByParamRepository
  ) {}

  async execute(userId: string, updateUserDto: UpdateUserParams): Promise<GetUserResponse> {
    const user = await this.getUserService.execute({ id: userId })
    
    await this.checkIfEmailOrUsernameExists(user, updateUserDto)

    const updatedUser = await this.updateUserRepo.update(userId, updateUserDto)
    if (!updatedUser) throw new BadRequestError('Erro ao atualizar dados do usuário')

    return mapToUserResponseDto(updatedUser)
  }

  private async checkIfEmailOrUsernameExists(user: GetUserResponse, updateUserDto: UpdateUserParams) {
    if (updateUserDto?.email && updateUserDto.email !== user.email) {
      const userEmailAlreadyExists = await this.loadUserRepo.findOne({ 
        email: updateUserDto.email 
      });
      if (userEmailAlreadyExists) throw new AlreadyExistsError('O email já existe');
    }

    if (updateUserDto?.username && updateUserDto.username !== user.username) {
      const userNameAlreadyExists = await this.loadUserRepo.findOne({ 
        username: updateUserDto.username 
      });
      if (userNameAlreadyExists) throw new AlreadyExistsError('O nome de usuário já existe');
    }
  }
}