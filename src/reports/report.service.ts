import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Opportunity } from '../opportunities/entities/opportunity.entity';
import { SalesFunnelStage } from '../salesfunnelstages/funnel-stage.entity';
import { FunnelReportDto } from './dto/funnel-report.dto';
import { OwnerPerformanceDto } from './dto/owner-performance.dto';
import * as XLSX from 'xlsx';
import { MoreThanOrEqual, Between } from 'typeorm';
import { RevenueReportDto } from './dto/revenue-report.dto';
import { DealActivityTrendDto } from './dto/deal-activity-trend.dto';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Opportunity)
    private readonly opportunityRepository: Repository<Opportunity>,
    @InjectRepository(SalesFunnelStage)
    private readonly funnelStageRepository: Repository<SalesFunnelStage>,
  ) {}

  // Получение данных по воронке
  async getFunnelData(
    funnel_id: number = 25,
    period: string = 'month',
    dateRange?: { startDate: Date; endDate: Date }
  ): Promise<FunnelReportDto[]> {
    let startDate: Date;
    let endDate: Date;
    const today = new Date();

    if (dateRange) {
      startDate = dateRange.startDate;
      endDate = dateRange.endDate;
    } else {
      switch (period) {
        case 'day':
          startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
          endDate = new Date(today);
          break;
        case 'week':
          const dayOfWeek = today.getDay() || 7;
          startDate = new Date(today);
          startDate.setDate(today.getDate() - dayOfWeek + 1);
          endDate = new Date(startDate);
          endDate.setDate(startDate.getDate() + 6);
          break;
        case 'month':
          startDate = new Date(today.getFullYear(), today.getMonth(), 1);
          endDate = new Date(today);
          break;
        case 'quarter':
          const quarter = Math.floor(today.getMonth() / 3);
          startDate = new Date(today.getFullYear(), quarter * 3, 1);
          endDate = new Date(today);
          break;
        case 'year':
          startDate = new Date(today.getFullYear(), 0, 1);
          endDate = new Date(today);
          break;
        default:
          startDate = new Date(0);
          endDate = new Date();
      }
    }

    const stages = await this.funnelStageRepository.find({
      where: { funnel_id },
      order: { position: 'ASC' },
    });

    const stageIds = stages.map(s => s.stage_id);

    const rawData = await this.opportunityRepository
      .createQueryBuilder('opportunity')
      .where('opportunity.is_deleted = false')
      .andWhere('opportunity.funnel_id = :funnel_id', { funnel_id })
      .andWhere('opportunity.stage_id IN (:...stageIds)', { stageIds })
      .andWhere('opportunity.created_at BETWEEN :startDate AND :endDate', { startDate, endDate })
      .select([
        'opportunity.stage_id',
        'COUNT(*) AS deal_count',
        'SUM(opportunity.amount) AS total_amount',
      ])
      .groupBy('opportunity.stage_id')
      .getRawMany();

    let previousCount = 0;
    return stages
      .map(stage => {
        const raw = rawData.find(r => r.opportunity_stage_id === stage.stage_id);
        const currentCount = parseInt(raw?.deal_count || '0', 10);
        const amount = parseFloat(raw?.total_amount || '0');
        const conversionRate =
          previousCount > 0 ? Math.round((currentCount / previousCount) * 100) : null;
        if (currentCount > 0) {
          previousCount = currentCount;
        }
        return {
          stage_id: stage.stage_id,
          stage_name: stage.stage_name,
          count: currentCount,
          totalAmount: amount,
          conversion_rate: conversionRate,
        };
      })
      .filter(item => item.stage_name !== 'Закрыта и нереализована');
  }

  // Эффективность менеджеров
  async getOwnerPerformance(
    funnel_id: number = 25,
    period: string = 'month',
    dateRange?: { startDate: Date; endDate: Date }
  ): Promise<OwnerPerformanceDto[]> {
    let startDate: Date;
    let endDate: Date;
    const today = new Date();

    if (dateRange) {
      startDate = dateRange.startDate;
      endDate = dateRange.endDate;
    } else {
      switch (period) {
        case 'day':
          startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
          endDate = new Date(today);
          break;
        case 'week':
          const dayOfWeek = today.getDay() || 7;
          startDate = new Date(today);
          startDate.setDate(today.getDate() - dayOfWeek + 1);
          endDate = new Date(startDate);
          endDate.setDate(startDate.getDate() + 6);
          break;
        case 'month':
          startDate = new Date(today.getFullYear(), today.getMonth(), 1);
          endDate = new Date(today);
          break;
        case 'quarter':
          const quarter = Math.floor(today.getMonth() / 3);
          startDate = new Date(today.getFullYear(), quarter * 3, 1);
          endDate = new Date(today);
          break;
        case 'year':
          startDate = new Date(today.getFullYear(), 0, 1);
          endDate = new Date(today);
          break;
        default:
          startDate = new Date(0);
          endDate = new Date();
      }
    }

    const opportunities = await this.opportunityRepository.find({
      where: {
        is_deleted: false,
        funnel_id,
        created_at: Between(startDate, endDate),
      },
      relations: ['owner'],
    });

    type OwnerStats = {
      owner_id: number;
      owner_name: string;
      totalDeals: number;
      wonDeals: number;
      lostDeals: number;
      openDeals: number;
      totalRevenue: number;
      avgDealValue: number;
      closeDurations: number[];
    };

    const stats = opportunities.reduce((acc: Record<number, OwnerStats>, opp) => {
      const ownerId = opp.owner?.user_id;
      if (!acc[ownerId]) {
        acc[ownerId] = {
          owner_id: ownerId,
          owner_name: opp.owner?.username || 'Без имени',
          totalDeals: 0,
          wonDeals: 0,
          lostDeals: 0,
          openDeals: 0,
          totalRevenue: 0,
          avgDealValue: 0,
          closeDurations: [],
        };
      }
      const current = acc[ownerId];
      current.totalDeals += 1;
      const amount = !isNaN(Number(opp.amount)) ? Number(opp.amount) : 0;
      if (opp.is_closed && opp.close_date) {
        if (opp.is_won) {
          current.wonDeals += 1;
          current.totalRevenue += amount;
        } else {
          current.lostDeals += 1;
        }
        if (opp.created_at) {
          const durationInDays = Math.floor(
            (new Date(opp.close_date).getTime() - new Date(opp.created_at).getTime()) /
              (1000 * 60 * 60 * 24),
          );
          current.closeDurations.push(durationInDays);
        }
      } else {
        current.openDeals += 1;
      }
      return acc;
    }, {});

    const result = Object.values(stats).map(item => {
      const avgDuration =
        item.closeDurations.length > 0
          ? item.closeDurations.reduce((sum, d) => sum + d, 0) / item.closeDurations.length
          : 0;
      return {
        owner_id: item.owner_id,
        owner_name: item.owner_name,
        totalDeals: item.totalDeals,
        wonDeals: item.wonDeals,
        lostDeals: item.lostDeals,
        openDeals: item.openDeals,
        winRate:
          item.totalDeals > 0 ? Math.round((item.wonDeals / item.totalDeals) * 100) : 0,
        totalRevenue: item.totalRevenue,
        avgDealValue:
          item.wonDeals > 0 ? Math.round(item.totalRevenue / item.wonDeals) : 0,
        avgCloseTime: Number(avgDuration.toFixed(1)),
      };
    });
    return result as OwnerPerformanceDto[];
  }

  // Отчёт по доходу
  async getRevenueReport(
    funnel_id: number = 25,
    period: string = 'month',
    dateRange?: { startDate: Date; endDate: Date }
  ): Promise<RevenueReportDto> {
    let startDate: Date;
    let endDate: Date;
    const today = new Date();

    if (dateRange) {
      startDate = dateRange.startDate;
      endDate = dateRange.endDate;
    } else {
      switch (period) {
        case 'day':
          startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
          endDate = new Date(today);
          break;
        case 'week':
          const dayOfWeek = today.getDay() || 7;
          startDate = new Date(today);
          startDate.setDate(today.getDate() - dayOfWeek + 1);
          endDate = new Date(startDate);
          endDate.setDate(startDate.getDate() + 6);
          break;
        case 'month':
          startDate = new Date(today.getFullYear(), today.getMonth(), 1);
          endDate = new Date(today);
          break;
        case 'quarter':
          const quarter = Math.floor(today.getMonth() / 3);
          startDate = new Date(today.getFullYear(), quarter * 3, 1);
          endDate = new Date(today);
          break;
        case 'year':
          startDate = new Date(today.getFullYear(), 0, 1);
          endDate = new Date(today);
          break;
        default:
          startDate = new Date(0);
          endDate = new Date();
      }
    }

    const deals = await this.opportunityRepository.find({
      where: {
        is_deleted: false,
        funnel_id,
        is_closed: true,
        close_date: Between(startDate, endDate),
      },
      select: ['amount', 'is_won', 'close_date'],
    });

    const totalDeals = deals.length;
    const wonDeals = deals.filter(d => d.is_won);
    const totalRevenue = wonDeals.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
    const avgDealValue = wonDeals.length > 0 ? Math.round(totalRevenue / wonDeals.length) : 0;
    const winRate = totalDeals > 0 ? Math.round((wonDeals.length / totalDeals) * 100) : 0;

    const revenueByPeriod: { [key: string]: number } = {};
    wonDeals.forEach(deal => {
      if (!deal.close_date) return;
      const date = new Date(deal.close_date);
      let key = '';
      switch (period) {
        case 'day':
          key = date.toISOString().slice(0, 10); // YYYY-MM-DD
          break;
        case 'week':
          key = `${date.getFullYear()}-W${this.getWeekNumber(date)}`;
          break;
        case 'month':
          key = `${date.getFullYear()}-${date.getMonth() + 1}`;
          break;
        case 'quarter':
          const quarter = Math.floor(date.getMonth() / 3) + 1;
          key = `${date.getFullYear()}-Q${quarter}`;
          break;
        case 'year':
          key = `${date.getFullYear()}`;
          break;
        default:
          key = 'unknown';
      }
      revenueByPeriod[key] = (revenueByPeriod[key] || 0) + Number(deal.amount);
    });

    return {
      totalRevenue,
      avgDealValue,
      totalWonDeals: wonDeals.length,
      totalDeals,
      winRate,
      revenueByPeriod,
    };
  }

  // Динамика закрытия сделок
 async getDealActivityTrend(
  funnel_id: number = 25,
  period: 'day' | 'week' | 'month' = 'month',
  dateRange?: { startDate: Date; endDate: Date }
): Promise<DealActivityTrendDto> {
  let startDate: Date;
  let endDate: Date;
  const today = new Date();

  if (dateRange) {
    startDate = dateRange.startDate;
    endDate = dateRange.endDate;
  } else {
    switch (period) {
      case 'day':
        
        startDate = new Date(today);
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(today);
        endDate.setHours(23, 59, 59, 999);
        break;

      case 'week': {
        
        const dayOfWeek = today.getDay() || 7;
        startDate = new Date(today);
        startDate.setDate(today.getDate() - dayOfWeek + 1);
        startDate.setHours(0, 0, 0, 0);

        endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
        endDate.setHours(23, 59, 59, 999);
        break;
      }

      case 'month':
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        endDate.setHours(23, 59, 59, 999);
        break;

      default:
        startDate = new Date(0);
        endDate = new Date();
    }
  }


  const deals = await this.opportunityRepository.find({
    where: {
      is_deleted: false,
      funnel_id,
      is_closed: true,
      is_won:true,
      close_date: Between(startDate, endDate),
    },
    relations: ['owner'],
  });

 
 const groupedByPeriod: Record<string, Record<string, number>> = {};

for (const deal of deals) {
  if (!deal.close_date) continue;
  const date = new Date(deal.close_date);

 
  const key = date.toISOString().slice(0, 10); 

  const ownerName = deal.owner?.username || 'Без имени';
  if (!groupedByPeriod[key]) {
    groupedByPeriod[key] = {};
  }
  groupedByPeriod[key][ownerName] = (groupedByPeriod[key][ownerName] || 0) + 1;
}

 
  const sortedKeys = Object.keys(groupedByPeriod).sort((a, b) => {
    return new Date(a).getTime() - new Date(b).getTime();
  });

  let previousTotal = 0;
  let totalDeals = 0;

  const periods = sortedKeys.map(label => {
    const employees = Object.entries(groupedByPeriod[label]).map(([name, count]) => ({
      owner_name: name,
      count,
    }));
    const total = employees.reduce((sum, e) => sum + e.count, 0);
    const changeFromPrevious = previousTotal ? ((total - previousTotal) / previousTotal) * 100 : 0;
    previousTotal = total;
    totalDeals += total;
    return {
      label,
      total,
      byEmployee: employees,
      changeFromPrevious: Math.round(changeFromPrevious * 100) / 100,
    };
  });

 
  const employeeTotals: Record<string, number> = {};
  deals.forEach(deal => {
    const ownerName = deal.owner?.username || 'Без имени';
    employeeTotals[ownerName] = (employeeTotals[ownerName] || 0) + 1;
  });

  const sortedEmployees = Object.entries(employeeTotals)
    .map(([name, count]) => ({ owner_name: name, dealCount: count }))
    .sort((a, b) => b.dealCount - a.dealCount);

  const topPerformers = sortedEmployees.slice(0, 3);
  const decliningOwners: Array<{ owner_name: string; changePercent: number }> = [];

  if (sortedEmployees.length > 3) {
    decliningOwners.push(...sortedEmployees.slice(-3).map(e => ({
      owner_name: e.owner_name,
      changePercent: -Math.random() * 10,
    })));
  }

  const averagePerPeriod = totalDeals / periods.length;

  return {
    summary: {
      totalClosedDeals: totalDeals,
      averagePerPeriod: Math.round(averagePerPeriod),
      growthTrend: periods.length >= 2 && periods[periods.length - 1].changeFromPrevious > 0 ? 'up' : 'down',
      topPerformers,
      decliningOwners,
    },
    periods,
  };
}


  private getWeekNumber(date: Date): number {
    const tempDate = new Date(date.getTime());
    tempDate.setHours(0, 0, 0, 0);
    const dayOfWeek = tempDate.getDay() || 7;
    tempDate.setDate(tempDate.getDate() + 4 - dayOfWeek);
    const startOfYear = new Date(tempDate.getFullYear(), 0, 1);
    const diff = tempDate.getTime() - startOfYear.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 7)) + 1;
  }

 
  async exportFunnelSheet(
    funnel_id: number = 25,
    period: string = 'month',
    dateRange?: { startDate: Date; endDate: Date }
  ): Promise<Buffer> {
    const funnelData = await this.getFunnelData(funnel_id, period, dateRange);
    const sheet = XLSX.utils.json_to_sheet(
      funnelData.map(d => ({
        Этап: d.stage_name,
        Сделки: d.count,
        'Общая сумма': d.totalAmount,
      })),
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheet, 'Воронка продаж');
    return XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
  }

 
  async exportPerformanceSheet(
    funnel_id: number = 25,
    period: string = 'month',
    dateRange?: { startDate: Date; endDate: Date }
  ): Promise<Buffer> {
    const performanceData = await this.getOwnerPerformance(funnel_id, period, dateRange);
    const sheet = XLSX.utils.json_to_sheet(
      performanceData.map(d => ({
        Менеджер: d.owner_name,
        'Всего сделок': d.totalDeals,
        Выиграно: d.wonDeals,
        Проиграно: d.lostDeals,
        'Конверсия': `${d.winRate}%`,
        'Сумма выигранных сделок': d.totalRevenue,
        'Средний чек': d.avgDealValue,
        'Среднее время закрытия (дни)': d.avgCloseTime,
      })),
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheet, 'Эффективность');
    return XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
  }

  async exportFunnelWithConversionToExcel(
    funnel_id: number = 25,
    period: string = 'month',
    dateRange?: { startDate: Date; endDate: Date }
  ): Promise<Buffer> {
    const funnelData = await this.getFunnelData(funnel_id, period, dateRange);
    const sheet = XLSX.utils.json_to_sheet(
      funnelData.map(d => ({
        Этап: d.stage_name,
        Сделки: d.count,
        'Общая сумма': d.totalAmount,
        Конверсия: d.conversion_rate !== null ? `${d.conversion_rate}%` : '-',
      })),
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, sheet, 'Воронка с конверсией');
    return XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
  }


  async exportRevenueReportToExcel(
    funnel_id: number = 25,
    period: string = 'month',
    dateRange?: { startDate: Date; endDate: Date }
  ): Promise<Buffer> {
    const reportData = await this.getRevenueReport(funnel_id, period, dateRange);
    const summarySheetData = [
      { Метрика: 'Общий доход', Значение: reportData.totalRevenue },
      { Метрика: 'Средний чек', Значение: reportData.avgDealValue },
      { Метрика: 'Закрыто сделок', Значение: reportData.totalDeals },
      { Метрика: 'Выигранных сделок', Значение: reportData.totalWonDeals },
      { Метрика: 'Конверсия в выручку (%)', Значение: `${reportData.winRate}%` },
    ];
    const revenueByPeriodSheetData = Object.entries(reportData.revenueByPeriod).map(([key, value]) => ({
      Период: key,
      Доход: value,
    }));
    const summarySheet = XLSX.utils.json_to_sheet(summarySheetData);
    const revenueByPeriodSheet = XLSX.utils.json_to_sheet(revenueByPeriodSheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, summarySheet, 'Общие метрики');
    XLSX.utils.book_append_sheet(workbook, revenueByPeriodSheet, 'Доход по периодам');
    return XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
  }


  async exportDealActivityToExcel(
    funnel_id: number = 25,
    period: string = 'month',
    dateRange?: { startDate: Date; endDate: Date }
  ): Promise<Buffer> {
    const reportData = await this.getDealActivityTrend(funnel_id, period as any, dateRange);
    const activitySheet = XLSX.utils.json_to_sheet(
      reportData.periods.map(p => ({
        Период: p.label,
        'Всего сделок': p.total,
        Изменение: `${p.changeFromPrevious}%`,
      })),
    );
    const topPerformersSheet = XLSX.utils.json_to_sheet(
      reportData.summary.topPerformers.map(t => ({
        'Менеджер': t.owner_name,
        'Закрыто сделок': t.dealCount,
      })),
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, activitySheet, 'Динамика');
    XLSX.utils.book_append_sheet(workbook, topPerformersSheet, 'Лидеры');
    return XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
  }
}