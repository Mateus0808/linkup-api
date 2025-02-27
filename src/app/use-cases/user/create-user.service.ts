import { ICreateUserRepository, ICreateUserRepositoryToken } from "src/app/ports/repositories/user/create-user-repository.interface";
import { CreateUserParams, CreateUserReponse, ICreateUserService } from "../../interfaces/user/create-user-service.interface";
import { Inject, Injectable } from "@nestjs/common";
import { mapToUserResponseDto } from "src/app/mappers/user.mapper";
import { AlreadyExistsError } from "src/app/errors/already-exists-error";
import { BadRequestError } from "src/app/errors/bad-request-error";
import { IHasher, IHasherToken } from "src/app/ports/hasher/hasher.interface";
import { ILoadUserByParamRepository, ILoadUserByParamRepositoryToken } from "src/app/ports/repositories/user/load-user-by-param-repository.interface";

@Injectable()
export class CreateUserService implements ICreateUserService {
  constructor(
    @Inject(ICreateUserRepositoryToken)
    private readonly userRepository: ICreateUserRepository,
    @Inject(ILoadUserByParamRepositoryToken)
    private readonly loadUserRepository: ILoadUserByParamRepository,
    @Inject(IHasherToken)
    private readonly argon: IHasher
  ) {}

  async createUser(params: CreateUserParams): Promise<CreateUserReponse> {
    const { email, name, password, username, ...rest } = params;

    const emailAlreadyExists = await this.loadUserRepository.findOne({ email });
    if (emailAlreadyExists) {
      throw new AlreadyExistsError('O email já existe');
    }

    const usernameAlreadyExists = await this.loadUserRepository.findOne({ username });
    if (usernameAlreadyExists) {
      throw new AlreadyExistsError('O nome de usuário já existe');
    }

    const hashedPassword = await this.argon.hash(password);

    const createdUser = await this.userRepository.createUser({
      name,
      email,
      password: hashedPassword,
      username,
      ...rest,
    });
    if (!createdUser) throw new BadRequestError('Erro ao criar usuário');

    return mapToUserResponseDto(createdUser);
  }
}