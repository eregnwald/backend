import { IsNotEmpty, Length } from 'class-validator';

export class CreatePermissionDto {
  @IsNotEmpty()
  @Length(3, 100)
  permission_code: string;

  description?: string;
}