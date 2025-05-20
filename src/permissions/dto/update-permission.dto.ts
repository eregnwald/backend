import { IsOptional, Length } from 'class-validator';

export class UpdatePermissionDto {
  @IsOptional()
  @Length(3, 100)
  permission_code?: string;

  @IsOptional()
  description?: string;
}