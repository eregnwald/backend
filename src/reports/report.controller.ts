import { Controller, Get, Res, Query } from '@nestjs/common';
import { Response } from 'express';
import { ReportService } from './report.service';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  // 📊 Воронка продаж
  @Get('funnel')
  async getFunnelReport(
    @Query('funnel_id') funnel_id: string,
    @Query('period') period: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const parsedStartDate = startDate ? new Date(startDate) : undefined;
    const parsedEndDate = endDate ? new Date(endDate) : undefined;

    return this.reportService.getFunnelData(
      funnel_id ? +funnel_id : 25,
      period,
      parsedStartDate && parsedEndDate ? { startDate: parsedStartDate, endDate: parsedEndDate } : undefined
    );
  }

  // 👥 Эффективность менеджеров
  @Get('performance')
  async getOwnerPerformance(
    @Query('funnel_id') funnel_id: string,
    @Query('period') period: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const parsedStartDate = startDate ? new Date(startDate) : undefined;
    const parsedEndDate = endDate ? new Date(endDate) : undefined;

    return this.reportService.getOwnerPerformance(
      funnel_id ? +funnel_id : 25,
      period,
      parsedStartDate && parsedEndDate ? { startDate: parsedStartDate, endDate: parsedEndDate } : undefined
    );
  }

  // 💰 Отчет по доходу
  @Get('revenue')
  async getRevenueReport(
    @Query('funnel_id') funnel_id: string,
    @Query('period') period: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const parsedStartDate = startDate ? new Date(startDate) : undefined;
    const parsedEndDate = endDate ? new Date(endDate) : undefined;

    return this.reportService.getRevenueReport(
      funnel_id ? +funnel_id : 25,
      period,
      parsedStartDate && parsedEndDate ? { startDate: parsedStartDate, endDate: parsedEndDate } : undefined
    );
  }

  // 📈 Динамика закрытия сделок
  @Get('deal-trend')
  async getDealTrendReport(
    @Query('funnel_id') funnel_id: string,
    @Query('period') period: 'day' | 'week' | 'month' = 'month',
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const parsedStartDate = startDate ? new Date(startDate) : undefined;
    const parsedEndDate = endDate ? new Date(endDate) : undefined;

    return this.reportService.getDealActivityTrend(
      funnel_id ? +funnel_id : 25,
      period,
      parsedStartDate && parsedEndDate ? { startDate: parsedStartDate, endDate: parsedEndDate } : undefined
    );
  }

  // 📊 Экспорт воронки
  @Get('export/funnel')
  async exportFunnelToExcel(
    @Res({ passthrough: true }) res: Response,
    @Query('funnel_id') funnel_id: string,
    @Query('period') period: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const parsedStartDate = startDate ? new Date(startDate) : undefined;
    const parsedEndDate = endDate ? new Date(endDate) : undefined;

    const buffer = await this.reportService.exportFunnelSheet(
      funnel_id ? +funnel_id : 25,
      period,
      parsedStartDate && parsedEndDate ? { startDate: parsedStartDate, endDate: parsedEndDate } : undefined
    );

    const periodLabel = this.getCustomPeriodLabel(parsedStartDate, parsedEndDate, period);
    const filename = encodeURIComponent(`Воронка_${periodLabel}_${this.getTodayDate()}.xlsx`);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${filename}; filename*=UTF-8''${filename}`,
    );

    return res.send(buffer);
  }

  // 👥 Экспорт эффективности
  @Get('export/performance')
  async exportPerformanceToExcel(
    @Res({ passthrough: true }) res: Response,
    @Query('funnel_id') funnel_id: string,
    @Query('period') period: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const parsedStartDate = startDate ? new Date(startDate) : undefined;
    const parsedEndDate = endDate ? new Date(endDate) : undefined;

    const buffer = await this.reportService.exportPerformanceSheet(
      funnel_id ? +funnel_id : 25,
      period,
      parsedStartDate && parsedEndDate ? { startDate: parsedStartDate, endDate: parsedEndDate } : undefined
    );

    const periodLabel = this.getCustomPeriodLabel(parsedStartDate, parsedEndDate, period);
    const filename = encodeURIComponent(`Эффективность_${periodLabel}_${this.getTodayDate()}.xlsx`);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${filename}; filename*=UTF-8''${filename}`,
    );

    return res.send(buffer);
  }

  // 💰 Экспорт отчёта по доходу
  @Get('export/revenue')
  async exportRevenueReport(
    @Res({ passthrough: true }) res: Response,
    @Query('funnel_id') funnel_id: string,
    @Query('period') period: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const parsedStartDate = startDate ? new Date(startDate) : undefined;
    const parsedEndDate = endDate ? new Date(endDate) : undefined;

    const buffer = await this.reportService.exportRevenueReportToExcel(
      funnel_id ? +funnel_id : 25,
      period,
      parsedStartDate && parsedEndDate ? { startDate: parsedStartDate, endDate: parsedEndDate } : undefined
    );

    const periodLabel = this.getCustomPeriodLabel(parsedStartDate, parsedEndDate, period);
    const filename = encodeURIComponent(`Отчет_по_доходу_${periodLabel}_${this.getTodayDate()}.xlsx`);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${filename}; filename*=UTF-8''${filename}`,
    );

    return res.send(buffer);
  }

  // 📈 Экспорт динамики закрытия сделок
  @Get('export/deal-trend')
  async exportDealTrendToExcel(
    @Res({ passthrough: true }) res: Response,
    @Query('funnel_id') funnel_id: string,
    @Query('period') period: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const parsedStartDate = startDate ? new Date(startDate) : undefined;
    const parsedEndDate = endDate ? new Date(endDate) : undefined;

    const buffer = await this.reportService.exportDealActivityToExcel(
      funnel_id ? +funnel_id : 25,
      period,
      parsedStartDate && parsedEndDate ? { startDate: parsedStartDate, endDate: parsedEndDate } : undefined
    );

    const periodLabel = this.getCustomPeriodLabel(parsedStartDate, parsedEndDate, period);
    const filename = encodeURIComponent(`Динамика_закрытий_${periodLabel}_${this.getTodayDate()}.xlsx`);

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${filename}; filename*=UTF-8''${filename}`,
    );

    return res.send(buffer);
  }

  // 🛠️ Вспомогательные функции

  private getTodayDate(): string {
    const today = new Date();
    return today.toISOString().slice(0, 10);
  }

  private getCustomPeriodLabel(
    startDate: Date | undefined,
    endDate: Date | undefined,
    period: string
  ): string {
    if (!startDate || !endDate) {
      return this.getPeriodLabel(period);
    }
    return `с_${startDate.toISOString().slice(0, 10)}_по_${endDate.toISOString().slice(0, 10)}`;
  }

  private getPeriodLabel(period: string): string {
    const today = new Date();
    const year = today.getFullYear();
    const monthNames = [
      'январь', 'февраль', 'март', 'апрель', 'май', 'июнь',
      'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'
    ];
    const currentMonth = monthNames[today.getMonth()];
    const quarter = Math.floor(today.getMonth() / 3) + 1;

    switch (period) {
      case 'day':
        return `день_${today.getDate()}-${today.getMonth() + 1}-${year}`;
      case 'week': {
        const weekNum = this.getWeekNumber(today);
        return `неделя_W${weekNum}_${year}`;
      }
      case 'month':
        return `месяц_${currentMonth}_${year}`;
      case 'quarter':
        return `квартал_Q${quarter}_${year}`;
      case 'year':
        return `год_${year}`;
      default:
        return `период_не_установлен`;
    }
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
}