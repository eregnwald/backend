import { Response } from 'express';
import { ReportService } from './report.service';
export declare class ReportController {
    private readonly reportService;
    constructor(reportService: ReportService);
    getFunnelReport(funnel_id: string, period: string, startDate?: string, endDate?: string): Promise<import("./dto/funnel-report.dto").FunnelReportDto[]>;
    getOwnerPerformance(funnel_id: string, period: string, startDate?: string, endDate?: string): Promise<import("./dto/owner-performance.dto").OwnerPerformanceDto[]>;
    getRevenueReport(funnel_id: string, period: string, startDate?: string, endDate?: string): Promise<import("./dto/revenue-report.dto").RevenueReportDto>;
    getDealTrendReport(funnel_id: string, period?: 'day' | 'week' | 'month', startDate?: string, endDate?: string): Promise<import("./dto/deal-activity-trend.dto").DealActivityTrendDto>;
    exportFunnelToExcel(res: Response, funnel_id: string, period: string, startDate?: string, endDate?: string): Promise<Response<any, Record<string, any>>>;
    exportPerformanceToExcel(res: Response, funnel_id: string, period: string, startDate?: string, endDate?: string): Promise<Response<any, Record<string, any>>>;
    exportRevenueReport(res: Response, funnel_id: string, period: string, startDate?: string, endDate?: string): Promise<Response<any, Record<string, any>>>;
    exportDealTrendToExcel(res: Response, funnel_id: string, period: string, startDate?: string, endDate?: string): Promise<Response<any, Record<string, any>>>;
    private getTodayDate;
    private getCustomPeriodLabel;
    private getPeriodLabel;
    private getWeekNumber;
}
