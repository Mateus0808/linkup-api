import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { CreateUserRepositoryParams, ICreateUserRepository } from "src/app/ports/repositories/user/create-user-repository.interface"
import { User } from "../pg/user.entity"
import { Repository } from "typeorm"
import { UserDatabaseModel } from "src/app/ports/repositories/models/user.model"
import { ILoadUserByParamRepository, LoadUserByParam } from "src/app/ports/repositories/user/load-user-by-param-repository.interface"
import { IUpdateUserRepository, UpdateUserRepoParams } from "src/app/ports/repositories/user/update-user-repository.port"
import { FindAllUsersRepositoryParams, FindAllUsersRepositoryResponse, IFindAllUsersRepository } from "src/app/ports/repositories/user/find-all-users-repository.port"

@Injectable()
export class UserRepository implements 
  ICreateUserRepository, 
  ILoadUserByParamRepository,
  IUpdateUserRepository,
  IFindAllUsersRepository
{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser (data: CreateUserRepositoryParams): Promise<UserDatabaseModel | null> {
    const user = this.userRepository.create(data)

    const savedUser = await this.userRepository.save(user)
    if (!savedUser) return null

    return savedUser
  }

  async findOne (param: Partial<LoadUserByParam>): Promise<UserDatabaseModel | null> {
    const user = await this.userRepository.findOne({
      where: param, relations: ['posts']
    })
    if (!user) return null

    return user
  }

  async findAll (params: FindAllUsersRepositoryParams): Promise<FindAllUsersRepositoryResponse> {
    const { limit, page, filters } = params
    const skip = page > 0 ? (page - 1) * limit : 0;

    const queryBuilder = this.userRepository.createQueryBuilder('user');

    if (filters.name) {
      queryBuilder.andWhere('user.name LIKE :name', { name: `%${filters.name}%` });
    }
    if (filters.username) {
      queryBuilder.andWhere("user.username LIKE :username", { username: `%${filters.username}%` });
    }

    queryBuilder.skip(skip).take(limit).orderBy('created_at')

    const [data, total] = await queryBuilder.getManyAndCount();
    return { data, total }
  }

  async update(userId: string, data: UpdateUserRepoParams): Promise<UserDatabaseModel | null> {
    const user = await this.userRepository.update(userId, data)
    if(!user) return null

    return await this.findOne({ id: userId })
  }
}