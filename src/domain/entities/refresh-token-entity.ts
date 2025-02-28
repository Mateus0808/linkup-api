import { UserEntity } from "./user-entity";

export type RefreshTokenEntity = {
  user: UserEntity
  refreshToken: string;
  expiresAt: Date;
  revoked: boolean;
}