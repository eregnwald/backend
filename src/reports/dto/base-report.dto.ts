// base-report.dto.ts
import { IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class BaseReportDto {
  @IsOptional()
  funnel_id?: number;

  @IsOptional()
  period?: 'day' | 'week' | 'month' | 'quarter' | 'year';

  @IsOptional()
  @Type(() => Date)
  startDate?: Date;

  @IsOptional()
  @Type(() => Date)
  endDate?: Date;
}