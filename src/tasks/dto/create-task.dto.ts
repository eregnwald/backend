import { IsNotEmpty, IsString, IsDate, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string; 

  @IsString()
  @IsOptional()
  description?: string;

  @IsNotEmpty()
  @IsDate()
  due_date: Date; 

  @IsBoolean()
  @IsOptional()
  is_urgent?: boolean;

  @IsNotEmpty()
  @IsNumber()
  assigned_to: number; 

  @IsNumber()
  @IsNotEmpty()
  task_type_id: number; 

  @IsNumber()
  @IsOptional()
  related_contact?: number | null;

  @IsNumber()
  @IsOptional()
  account_id?: number | null;

  @IsNumber()
  @IsOptional()
  opportunity_id?: number | null;
}