import { Type } from 'class-transformer';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MaxLength(100, { message: 'O nome deve ter no máximo 100 caracteres' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'O nome de usuário é obrigatório' })
  @MinLength(4, { message: 'O nome de usuário deve ter pelo menos 4 caracteres' })
  @MaxLength(50, { message: 'O nome de usuário deve ter no máximo 50 caracteres' })
  @Matches(/^[a-zA-Z0-9_.-]*$/, { message: 'O nome de usuário pode conter apenas letras, números, ".", "_" e "-"' })
  username: string;

  @IsEmail({}, { message: 'Informe um email válido' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  @MaxLength(191)
  email: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty({ message: 'A data de nascimento é obrigatória' })
  birthDate: Date;

  @IsString()
  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @MinLength(8, { message: 'A senha deve ter pelo menos 8 caracteres' })
  @MaxLength(32, { message: 'A senha deve ter no máximo 32 caracteres' })
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/, { 
    message: 'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial'
  })
  password: string;
}