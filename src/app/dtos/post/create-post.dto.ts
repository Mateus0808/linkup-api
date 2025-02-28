import { IsNotEmpty, IsString, IsUUID, Length } from "class-validator"

export class CreatePostDto {
  @IsUUID()
  @IsNotEmpty()
  userId: string

  @IsString()
  @IsNotEmpty()
  @Length(5, 100)
  title: string

  @IsString()
  @IsNotEmpty()
  @Length(10, 500)
  description: string
}