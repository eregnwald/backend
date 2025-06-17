import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  account_name: string;

  @IsOptional()
  @IsString()
  website?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsNumber()
  annual_revenue?: number;

  @IsOptional()
  @IsString()
  address?: string;

  @IsNumber()
  owner_id?: number;

  @IsOptional()
  @IsNumber()
  contact_id?: number;

  @IsOptional()
  @IsBoolean()
  is_deleted?: boolean;
}