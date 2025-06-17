
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateAuditLogDto {
  @IsNotEmpty()
  @IsString()
  entity_type: string;

  @IsNotEmpty()
  @IsNumber()
  entity_id: number;

  @IsNotEmpty()
  @IsString()
  action: string; 

  old_values?: any;

  new_values?: any;
}