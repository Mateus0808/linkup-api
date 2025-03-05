import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { CreateRefreshTokenParams, ICreateRefreshTokenRepository } from "src/app/ports/repositories/refresh-token/create-refresh-token.interface";
import { RefreshToken } from "../pg/refresh-token.entity";
import { RefreshTokenDatabaseModel } from "src/app/ports/repositories/models/refresh-token.model";
import { ISaveRefreshTokenRepository } from "src/app/ports/repositories/refresh-token/save-refresh-token.interface";
import { FindOneRepoParams, IFindOneTokenRepository } from "src/app/ports/repositories/refresh-token/find-one-refresh-token.port.interface";

@Injectable()
export class RefreshTokenRepository implements 
  ICreateRefreshTokenRepository, 
  ISaveRefreshTokenRepository,
  IFindOneTokenRepository
  {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly tokenRepository: Repository<RefreshToken>
  ) {}
  
  async create (params: CreateRefreshTokenParams): Promise<RefreshTokenDatabaseModel | null> {
    const token = this.tokenRepository.create({
      user: { id: params.user.id },
      refreshToken: params.refreshToken,
      expiresAt: params.expiresAt
    })
    if (!token) return null
  
    return await this.save(token)
  }
  
  async save({ ...rest }: RefreshTokenDatabaseModel): Promise<RefreshTokenDatabaseModel> {
    const savedToken = await this.tokenRepository.save({
      ...rest
    })

    return savedToken
  }

  async findOne(criteria: Partial<FindOneRepoParams>): Promise<RefreshTokenDatabaseModel | null> {
    const token = await this.tokenRepository.findOne({
      where: criteria
    })
    if (!token) return null

    return token
  }
}