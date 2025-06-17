export interface DealActivityTrendDto {
    summary: {
        totalClosedDeals: number;
        averagePerPeriod: number;
        growthTrend: 'up' | 'down' | 'flat';
        topPerformers: Array<{
            owner_name: string;
            dealCount: number;
        }>;
        decliningOwners: Array<{
            owner_name: string;
            changePercent: number;
        }>;
    };
    periods: Array<{
        label: string;
        total: number;
        byEmployee: Array<{
            owner_name: string;
            count: number;
        }>;
        changeFromPrevious: number;
    }>;
}
