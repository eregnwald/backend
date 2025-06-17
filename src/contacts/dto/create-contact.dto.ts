// create-contact.dto.ts

import { IsString, IsEmail, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateContactDto {
  @IsString()
  first_name: string;
  
  @IsOptional()
  @IsString()
  last_name: string;
  
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  phone?: string;

  @IsOptional()
  job_title?: string;
  
  @IsOptional()
  @IsBoolean()
  is_primary: boolean;

  
  @IsNumber()
  owner_id?: number;

  @IsOptional()
  @IsNumber()
  account_id?: number; // ← добавлено
}