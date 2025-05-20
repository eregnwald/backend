import { IsOptional, Length } from 'class-validator';

export class UpdateRoleDto {
  @IsOptional()
  @Length(3, 50)
  role_name?: string;

  @IsOptional()
  description?: string;
}