import { RefreshTokenDatabaseModel } from "../models/refresh-token.model";

export interface FindOneRepoParams extends Pick<RefreshTokenDatabaseModel, 'id'> {}

export interface IFindOneTokenRepository {
  findOne(criteria: Partial<FindOneRepoParams>): Promise<RefreshTokenDatabaseModel | null>;
}

export const IFindOneTokenRepositoryToken = 'IFindOneTokenRepositoryToken'