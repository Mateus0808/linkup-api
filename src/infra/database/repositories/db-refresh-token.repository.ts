import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { CreateRefreshTokenParams, ICreateRefreshTokenRepository } from "src/app/ports/repositories/refresh-token/create-refresh-token.interface";
import { RefreshToken } from "../pg/refresh-token.entity";
import { RefreshTokenDatabaseModel } from "src/app/ports/repositories/models/refresh-token.model";
import { ISaveRefreshTokenRepository } from "src/app/ports/repositories/refresh-token/save-refresh-token.port";

@Injectable()
export class RefreshTokenRepository implements 
  ICreateRefreshTokenRepository, 
  ISaveRefreshTokenRepository
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
  
  async save({ user, ...rest }: RefreshTokenDatabaseModel): Promise<RefreshTokenDatabaseModel> {
    const savedToken = await this.tokenRepository.save({
      user: { id: user.id },
      ...rest
    })

    return savedToken
  }
}