import { IsNumber } from 'class-validator';

export class UpdateStageDto {
  @IsNumber()
  stage_id: number;

  lost_reason?: string | null;
}