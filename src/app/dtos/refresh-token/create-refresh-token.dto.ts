import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateRefreshTokenDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string

  @IsNotEmpty()
  refreshToken: string;

  @IsNotEmpty()
  expiresAt: Date;
}
