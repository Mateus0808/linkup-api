import { IsNotEmpty, IsString, IsUUID, Length } from "class-validator"

export class CreatePostDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string

  @IsString()
  @IsNotEmpty()
  @Length(2, 100)
  title: string

  @IsString()
  @IsNotEmpty()
  @Length(2, 500)
  description: string
}