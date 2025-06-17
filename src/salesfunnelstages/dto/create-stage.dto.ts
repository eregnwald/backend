import { IsString, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class CreateStageDto {
  @IsString()
  stage_name: string;

  @IsNumber()
  @IsOptional()
  position?: number;

  @IsNumber()
  @IsOptional()
  probability?: number;

  @IsBoolean()
  @IsOptional()
  is_closed?: boolean;
  
  @IsBoolean()
  is_won?: boolean;
}