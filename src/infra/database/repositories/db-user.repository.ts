import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { CreateUserRepositoryParams, ICreateUserRepository } from "src/app/ports/repositories/user/create-user-repository.interface"
import { User } from "../pg/user.entity"
import { Repository } from "typeorm"
import { UserDatabaseModel } from "src/app/ports/repositories/models/user.model"
import { ILoadUserByParamRepository, LoadUserByParam } from "src/app/ports/repositories/user/load-user-by-param-repository.interface"

@Injectable()
export class UserRepository implements ICreateUserRepository, ILoadUserByParamRepository
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
}