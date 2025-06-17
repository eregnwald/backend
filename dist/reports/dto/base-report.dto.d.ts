export declare class BaseReportDto {
    funnel_id?: number;
    period?: 'day' | 'week' | 'month' | 'quarter' | 'year';
    startDate?: Date;
    endDate?: Date;
}
