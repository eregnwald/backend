import { IsEmail, IsNotEmpty, MinLength, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(4)
  username: string;

  
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  first_name?: string;
  last_name?: string;
  
  @IsNotEmpty({ message: 'Выберите роль' })
  @IsInt({ message: 'ID роли должен быть числом' })
  role_id: number;

}