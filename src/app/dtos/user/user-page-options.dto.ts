import { IsOptional } from "class-validator";
import { PageOptionsDto } from "src/commom/dtos/page-options.dto";

export class UserPageOptionsDto extends PageOptionsDto {
  @IsOptional()
  readonly name: string

  @IsOptional()
  readonly username: string
}