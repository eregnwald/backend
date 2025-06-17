"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportController = void 0;
const common_1 = require("@nestjs/common");
const report_service_1 = require("./report.service");
let ReportController = class ReportController {
    reportService;
    constructor(reportService) {
        this.reportService = reportService;
    }
    async getFunnelReport(funnel_id, period, startDate, endDate) {
        const parsedStartDate = startDate ? new Date(startDate) : undefined;
        const parsedEndDate = endDate ? new Date(endDate) : undefined;
        return this.reportService.getFunnelData(funnel_id ? +funnel_id : 25, period, parsedStartDate && parsedEndDate ? { startDate: parsedStartDate, endDate: parsedEndDate } : undefined);
    }
    async getOwnerPerformance(funnel_id, period, startDate, endDate) {
        const parsedStartDate = startDate ? new Date(startDate) : undefined;
        const parsedEndDate = endDate ? new Date(endDate) : undefined;
        return this.reportService.getOwnerPerformance(funnel_id ? +funnel_id : 25, period, parsedStartDate && parsedEndDate ? { startDate: parsedStartDate, endDate: parsedEndDate } : undefined);
    }
    async getRevenueReport(funnel_id, period, startDate, endDate) {
        const parsedStartDate = startDate ? new Date(startDate) : undefined;
        const parsedEndDate = endDate ? new Date(endDate) : undefined;
        return this.reportService.getRevenueReport(funnel_id ? +funnel_id : 25, period, parsedStartDate && parsedEndDate ? { startDate: parsedStartDate, endDate: parsedEndDate } : undefined);
    }
    async getDealTrendReport(funnel_id, period = 'month', startDate, endDate) {
        const parsedStartDate = startDate ? new Date(startDate) : undefined;
        const parsedEndDate = endDate ? new Date(endDate) : undefined;
        return this.reportService.getDealActivityTrend(funnel_id ? +funnel_id : 25, period, parsedStartDate && parsedEndDate ? { startDate: parsedStartDate, endDate: parsedEndDate } : undefined);
    }
    async exportFunnelToExcel(res, funnel_id, period, startDate, endDate) {
        const parsedStartDate = startDate ? new Date(startDate) : undefined;
        const parsedEndDate = endDate ? new Date(endDate) : undefined;
        const buffer = await this.reportService.exportFunnelSheet(funnel_id ? +funnel_id : 25, period, parsedStartDate && parsedEndDate ? { startDate: parsedStartDate, endDate: parsedEndDate } : undefined);
        const periodLabel = this.getCustomPeriodLabel(parsedStartDate, parsedEndDate, period);
        const filename = encodeURIComponent(`Воронка_${periodLabel}_${this.getTodayDate()}.xlsx`);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=${filename}; filename*=UTF-8''${filename}`);
        return res.send(buffer);
    }
    async exportPerformanceToExcel(res, funnel_id, period, startDate, endDate) {
        const parsedStartDate = startDate ? new Date(startDate) : undefined;
        const parsedEndDate = endDate ? new Date(endDate) : undefined;
        const buffer = await this.reportService.exportPerformanceSheet(funnel_id ? +funnel_id : 25, period, parsedStartDate && parsedEndDate ? { startDate: parsedStartDate, endDate: parsedEndDate } : undefined);
        const periodLabel = this.getCustomPeriodLabel(parsedStartDate, parsedEndDate, period);
        const filename = encodeURIComponent(`Эффективность_${periodLabel}_${this.getTodayDate()}.xlsx`);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=${filename}; filename*=UTF-8''${filename}`);
        return res.send(buffer);
    }
    async exportRevenueReport(res, funnel_id, period, startDate, endDate) {
        const parsedStartDate = startDate ? new Date(startDate) : undefined;
        const parsedEndDate = endDate ? new Date(endDate) : undefined;
        const buffer = await this.reportService.exportRevenueReportToExcel(funnel_id ? +funnel_id : 25, period, parsedStartDate && parsedEndDate ? { startDate: parsedStartDate, endDate: parsedEndDate } : undefined);
        const periodLabel = this.getCustomPeriodLabel(parsedStartDate, parsedEndDate, period);
        const filename = encodeURIComponent(`Отчет_по_доходу_${periodLabel}_${this.getTodayDate()}.xlsx`);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=${filename}; filename*=UTF-8''${filename}`);
        return res.send(buffer);
    }
    async exportDealTrendToExcel(res, funnel_id, period, startDate, endDate) {
        const parsedStartDate = startDate ? new Date(startDate) : undefined;
        const parsedEndDate = endDate ? new Date(endDate) : undefined;
        const buffer = await this.reportService.exportDealActivityToExcel(funnel_id ? +funnel_id : 25, period, parsedStartDate && parsedEndDate ? { startDate: parsedStartDate, endDate: parsedEndDate } : undefined);
        const periodLabel = this.getCustomPeriodLabel(parsedStartDate, parsedEndDate, period);
        const filename = encodeURIComponent(`Динамика_закрытий_${periodLabel}_${this.getTodayDate()}.xlsx`);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=${filename}; filename*=UTF-8''${filename}`);
        return res.send(buffer);
    }
    getTodayDate() {
        const today = new Date();
        return today.toISOString().slice(0, 10);
    }
    getCustomPeriodLabel(startDate, endDate, period) {
        if (!startDate || !endDate) {
            return this.getPeriodLabel(period);
        }
        return `с_${startDate.toISOString().slice(0, 10)}_по_${endDate.toISOString().slice(0, 10)}`;
    }
    getPeriodLabel(period) {
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
    getWeekNumber(date) {
        const tempDate = new Date(date.getTime());
        tempDate.setHours(0, 0, 0, 0);
        const dayOfWeek = tempDate.getDay() || 7;
        tempDate.setDate(tempDate.getDate() + 4 - dayOfWeek);
        const startOfYear = new Date(tempDate.getFullYear(), 0, 1);
        const diff = tempDate.getTime() - startOfYear.getTime();
        return Math.floor(diff / (1000 * 60 * 60 * 24 * 7)) + 1;
    }
};
exports.ReportController = ReportController;
__decorate([
    (0, common_1.Get)('funnel'),
    __param(0, (0, common_1.Query)('funnel_id')),
    __param(1, (0, common_1.Query)('period')),
    __param(2, (0, common_1.Query)('startDate')),
    __param(3, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getFunnelReport", null);
__decorate([
    (0, common_1.Get)('performance'),
    __param(0, (0, common_1.Query)('funnel_id')),
    __param(1, (0, common_1.Query)('period')),
    __param(2, (0, common_1.Query)('startDate')),
    __param(3, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getOwnerPerformance", null);
__decorate([
    (0, common_1.Get)('revenue'),
    __param(0, (0, common_1.Query)('funnel_id')),
    __param(1, (0, common_1.Query)('period')),
    __param(2, (0, common_1.Query)('startDate')),
    __param(3, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getRevenueReport", null);
__decorate([
    (0, common_1.Get)('deal-trend'),
    __param(0, (0, common_1.Query)('funnel_id')),
    __param(1, (0, common_1.Query)('period')),
    __param(2, (0, common_1.Query)('startDate')),
    __param(3, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "getDealTrendReport", null);
__decorate([
    (0, common_1.Get)('export/funnel'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Query)('funnel_id')),
    __param(2, (0, common_1.Query)('period')),
    __param(3, (0, common_1.Query)('startDate')),
    __param(4, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "exportFunnelToExcel", null);
__decorate([
    (0, common_1.Get)('export/performance'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Query)('funnel_id')),
    __param(2, (0, common_1.Query)('period')),
    __param(3, (0, common_1.Query)('startDate')),
    __param(4, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "exportPerformanceToExcel", null);
__decorate([
    (0, common_1.Get)('export/revenue'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Query)('funnel_id')),
    __param(2, (0, common_1.Query)('period')),
    __param(3, (0, common_1.Query)('startDate')),
    __param(4, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "exportRevenueReport", null);
__decorate([
    (0, common_1.Get)('export/deal-trend'),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __param(1, (0, common_1.Query)('funnel_id')),
    __param(2, (0, common_1.Query)('period')),
    __param(3, (0, common_1.Query)('startDate')),
    __param(4, (0, common_1.Query)('endDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, String]),
    __metadata("design:returntype", Promise)
], ReportController.prototype, "exportDealTrendToExcel", null);
exports.ReportController = ReportController = __decorate([
    (0, common_1.Controller)('reports'),
    __metadata("design:paramtypes", [report_service_1.ReportService])
], ReportController);
//# sourceMappingURL=report.controller.js.map