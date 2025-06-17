export declare class RevenueReportDto {
    totalRevenue: number;
    avgDealValue: number;
    totalWonDeals: number;
    totalDeals: number;
    winRate: number;
    revenueByPeriod: {
        [period: string]: number;
    };
}
