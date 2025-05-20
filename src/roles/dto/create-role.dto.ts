import { IsNotEmpty, Length } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  @Length(3, 50)
  role_name: string;

  description?: string;
}