export class OwnerPerformanceDto {
  owner_id: number;
  owner_name: string;

  totalDeals: number;     
  wonDeals: number;       
  lostDeals: number;      
  openDeals: number;      

  winRate: number;       
  avgDealValue: number;   
  totalRevenue: number;   

  avgCloseTime?: number;  
}