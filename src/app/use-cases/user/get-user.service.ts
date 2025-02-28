import { Inject, Injectable } from '@nestjs/common';
import { NotFoundError } from 'src/app/errors/not-found-error';
import { GetUserResponse, IGetUserByParamService } from 'src/app/interfaces/user/get-user-by-param-service.interface';
import { mapToUserResponseDto } from 'src/app/mappers/user.mapper';
import { UserDatabaseModel } from 'src/app/ports/repositories/models/user.model';
import { ILoadUserByParamRepository, ILoadUserByParamRepositoryToken } from 'src/app/ports/repositories/user/load-user-by-param-repository.interface';

@Injectable()
export class GetUserByParamService implements IGetUserByParamService {
  constructor(
    @Inject(ILoadUserByParamRepositoryToken)
    private readonly userRepository: ILoadUserByParamRepository,
  ) {}
  
  async execute(param: Partial<UserDatabaseModel>): Promise<GetUserResponse> {
    const user = await this.userRepository.findOne(param);
    if (!user) throw new NotFoundError('Usuário não encontrado');

    return mapToUserResponseDto(user);
  }
}