import { RefreshTokenEntity } from "src/domain/entities/refresh-token-entity";
import { UserResponse } from "src/app/interfaces/user/get-user-by-param-service.interface";

export interface RefreshTokenDatabaseModel extends Omit<RefreshTokenEntity, "user"> {
  id: string
  user: UserResponse
  createdAt: Date;
}