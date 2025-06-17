export class StageConversionDto {
  from_stage_id: number;
  to_stage_id: number;
  from_to: string;
  from_stage_name: string;
  to_stage_name: string;
  transitions: number;
  conversion_rate: number;

from_position: number;
  to_position: number;
}