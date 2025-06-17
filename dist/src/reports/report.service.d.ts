import { Repository } from 'typeorm';
import { Opportunity } from '../opportunities/entities/opportunity.entity';
import { SalesFunnelStage } from '../salesfunnelstages/funnel-stage.entity';
import { FunnelReportDto } from './dto/funnel-report.dto';
import { OwnerPerformanceDto } from './dto/owner-performance.dto';
import { RevenueReportDto } from './dto/revenue-report.dto';
import { DealActivityTrendDto } from './dto/deal-activity-trend.dto';
export declare class ReportService {
    private readonly opportunityRepository;
    private readonly funnelStageRepository;
    constructor(opportunityRepository: Repository<Opportunity>, funnelStageRepository: Repository<SalesFunnelStage>);
    getFunnelData(funnel_id?: number, period?: string, dateRange?: {
        startDate: Date;
        endDate: Date;
    }): Promise<FunnelReportDto[]>;
    getOwnerPerformance(funnel_id?: number, period?: string, dateRange?: {
        startDate: Date;
        endDate: Date;
    }): Promise<OwnerPerformanceDto[]>;
    getRevenueReport(funnel_id?: number, period?: string, dateRange?: {
        startDate: Date;
        endDate: Date;
    }): Promise<RevenueReportDto>;
    getDealActivityTrend(funnel_id?: number, period?: 'day' | 'week' | 'month', dateRange?: {
        startDate: Date;
        endDate: Date;
    }): Promise<DealActivityTrendDto>;
    private getWeekNumber;
    exportFunnelSheet(funnel_id?: number, period?: string, dateRange?: {
        startDate: Date;
        endDate: Date;
    }): Promise<Buffer>;
    exportPerformanceSheet(funnel_id?: number, period?: string, dateRange?: {
        startDate: Date;
        endDate: Date;
    }): Promise<Buffer>;
    exportFunnelWithConversionToExcel(funnel_id?: number, period?: string, dateRange?: {
        startDate: Date;
        endDate: Date;
    }): Promise<Buffer>;
    exportRevenueReportToExcel(funnel_id?: number, period?: string, dateRange?: {
        startDate: Date;
        endDate: Date;
    }): Promise<Buffer>;
    exportDealActivityToExcel(funnel_id?: number, period?: string, dateRange?: {
        startDate: Date;
        endDate: Date;
    }): Promise<Buffer>;
}
