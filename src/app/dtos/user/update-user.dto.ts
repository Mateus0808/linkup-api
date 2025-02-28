import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsEnum, IsIn, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, MaxLength } from 'class-validator';
import { EnumGender } from 'src/domain/enum/user-gender.enum';
import { EnumUserStatus } from 'src/domain/enum/user-status.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsIn(
    [EnumUserStatus.ACTIVE, EnumUserStatus.INACTIVE, EnumUserStatus.BANNED], 
    { message: 'Status inválido.' }
  )
  @IsNotEmpty({ message: 'O campo status é obrigatório' })
  @IsOptional()
  status: EnumUserStatus;

  @IsString()
  @IsOptional()
  @MaxLength(20, { message: 'O estado civil deve ter no máximo 20 caracteres' })
  maritalStatus?: string;

  @IsPhoneNumber("BR", { message: 'O telefone deve ser um número válido' })
  @IsOptional()
  phone?: string;

  @IsEnum(EnumGender, { message: 'O gênero deve ser MALE, FEMALE ou OTHER' })
  @IsNotEmpty({ message: 'O gênero é obrigatório' })
  @IsOptional()
  gender: EnumGender;
}
