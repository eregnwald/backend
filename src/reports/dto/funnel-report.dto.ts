export class FunnelReportDto {
  stage_id: number;
  stage_name: string;
  count: number;
  totalAmount: number;
  conversion_rate: number | null; 

}