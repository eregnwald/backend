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
exports.OpportunitiesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const opportunity_entity_1 = require("./entities/opportunity.entity");
const opportunitytask_entity_1 = require("../opportunitytask/entitites/opportunitytask.entity");
const task_entity_1 = require("../tasks/entities/task.entity");
const common_2 = require("@nestjs/common");
const funnel_stage_entity_1 = require("../salesfunnelstages/funnel-stage.entity");
const opportunity_stage_history_service_1 = require("../opportunity-stage-history/opportunity-stage-history.service");
let OpportunitiesService = class OpportunitiesService {
    opportunityRepository;
    opportunityTaskRepository;
    taskRepository;
    funnelStageRepository;
    historyService;
    constructor(opportunityRepository, opportunityTaskRepository, taskRepository, funnelStageRepository, historyService) {
        this.opportunityRepository = opportunityRepository;
        this.opportunityTaskRepository = opportunityTaskRepository;
        this.taskRepository = taskRepository;
        this.funnelStageRepository = funnelStageRepository;
        this.historyService = historyService;
    }
    async create(dto) {
        const opportunity = this.opportunityRepository.create({
            ...dto,
            close_date: null,
        });
        return await this.opportunityRepository.save(opportunity);
    }
    async findAll(currentUser) {
        const isUser = currentUser.roles.includes('user');
        const queryBuilder = this.opportunityRepository.createQueryBuilder('opportunity')
            .leftJoinAndSelect('opportunity.account', 'account')
            .leftJoinAndSelect('opportunity.contact', 'contact')
            .leftJoinAndSelect('opportunity.stage', 'stage')
            .leftJoinAndSelect('opportunity.owner', 'owner')
            .where('opportunity.is_deleted = :isDeleted', { isDeleted: false });
        if (isUser) {
            queryBuilder.andWhere('opportunity.owner_id = :userId', { userId: currentUser.userId });
        }
        return await queryBuilder.getMany();
    }
    async findOne(id) {
        const opportunity = await this.opportunityRepository.findOne({
            where: { opportunity_id: id, is_deleted: false },
            relations: ['account', 'contact', 'stage', 'owner'],
        });
        if (!opportunity) {
            throw new Error(`Сделка с ID ${id} не найдена`);
        }
        return opportunity;
    }
    async update(id, dto) {
        const opportunity = await this.opportunityRepository.findOneBy({ opportunity_id: id });
        if (!opportunity) {
            throw new common_2.HttpException('Сделка не найдена', common_2.HttpStatus.NOT_FOUND);
        }
        Object.assign(opportunity, dto);
        opportunity.updated_at = new Date();
        return this.opportunityRepository.save(opportunity);
    }
    async remove(id) {
        const opportunity = await this.findOne(id);
        opportunity.is_deleted = true;
        await this.opportunityRepository.save(opportunity);
    }
    async restore(id) {
        const opportunity = await this.findOne(id);
        opportunity.is_deleted = false;
        return await this.opportunityRepository.save(opportunity);
    }
    async getFunnelData() {
        const rawData = await this.opportunityRepository
            .createQueryBuilder('opportunity')
            .innerJoin('opportunity.stage', 'stage')
            .where('opportunity.is_deleted = false')
            .andWhere('opportunity.stage_id IS NOT NULL')
            .select([
            'stage.stage_id',
            'stage.stage_name',
            'COUNT(opportunity.opportunity_id)',
            'SUM(opportunity.amount)',
        ])
            .groupBy('stage.stage_id')
            .addGroupBy('stage.stage_name')
            .getRawMany();
        const allDeals = await this.opportunityRepository.find({
            where: { is_deleted: false },
            relations: ['stage'],
        });
        const dealsByStage = allDeals.reduce((acc, deal) => {
            const key = deal.stage_id;
            if (!acc[key])
                acc[key] = [];
            acc[key].push(deal);
            return acc;
        }, {});
        return rawData.map((item) => ({
            stage_id: parseInt(item.stage_stage_id, 10),
            stage_name: item.stage_stage_name,
            count: parseInt(item.count, 10),
            totalAmount: parseFloat(item.sum),
            deals: dealsByStage[item.stage_stage_id] || [],
        }));
    }
    async getOpportunitiesByFunnelId(funnelId) {
        return this.opportunityRepository.find({
            where: { funnel_id: funnelId, is_deleted: false },
            relations: {
                account: true,
                contact: true,
                stage: true,
                owner: true,
            },
        });
    }
    async updateStage(opportunityId, stageId, lost_reason) {
        const opportunity = await this.opportunityRepository.findOneBy({ opportunity_id: opportunityId });
        if (!opportunity) {
            throw new Error(`Сделка с ID ${opportunityId} не найдена`);
        }
        const stage = await this.funnelStageRepository.findOneBy({ stage_id: stageId });
        if (!stage) {
            throw new Error(`Этап с ID ${stageId} не найден`);
        }
        const oldStageId = opportunity.stage_id;
        opportunity.stage_id = stageId;
        opportunity.is_closed = stage.is_closed;
        opportunity.is_won = stage.is_won;
        if (stage.is_closed && !opportunity.close_date) {
            opportunity.close_date = new Date();
        }
        else if (!stage.is_closed) {
            opportunity.close_date = null;
        }
        if (!stage.is_won && !stage.is_closed) {
            opportunity.lost_reason = null;
        }
        else if (!stage.is_won && stage.is_closed) {
            opportunity.lost_reason = lost_reason ?? null;
        }
        opportunity.updated_at = new Date();
        await this.opportunityRepository.save(opportunity);
        await this.historyService.logStageChange(opportunityId, oldStageId, stageId);
        return opportunity;
    }
    async getTasksByOpportunity(opportunityId) {
        const links = await this.opportunityTaskRepository.find({
            where: { opportunity_id: opportunityId },
            relations: ['task', 'task.assignedUser', 'task.contact', 'task.account'],
        });
        return links.map(link => link.task);
    }
    async addTask(opportunityId, taskId) {
        const task = await this.taskRepository.findOneBy({ task_id: taskId });
        if (!task) {
            throw new Error(`Задача с ID ${taskId} не найдена`);
        }
        const existingLink = await this.opportunityTaskRepository.findOne({
            where: {
                opportunity_id: opportunityId,
                task_id: taskId,
            },
        });
        if (existingLink) {
            throw new Error('Эта задача уже привязана к данной сделке');
        }
        const link = this.opportunityTaskRepository.create({
            opportunity_id: opportunityId,
            task_id: taskId,
        });
        await this.opportunityTaskRepository.save(link);
    }
    async removeTask(opportunityId, taskId) {
        const link = await this.opportunityTaskRepository.findOne({
            where: {
                opportunity_id: opportunityId,
                task_id: taskId,
            },
        });
        if (!link) {
            throw new Error('Связь не найдена');
        }
        await this.opportunityTaskRepository.remove(link);
    }
    async createTask(opportunityId, dto) {
        const task = new task_entity_1.Task();
        Object.assign(task, dto);
        task.opportunity_id = opportunityId;
        await this.taskRepository.save(task);
        return task;
    }
    async getConversionRates() {
        const history = await this.historyService.getHistoryByOpportunity(0);
        const transitions = {};
        for (const item of history) {
            if (!item.old_stage_id)
                continue;
            const key = `${item.old_stage_id}-${item.new_stage_id}`;
            transitions[key] = (transitions[key] || 0) + 1;
        }
        return transitions;
    }
    async getAverageTimeOnStages() {
        const allHistory = await this.historyService.getHistoryByOpportunity(0);
        const durations = {};
        for (let i = 0; i < allHistory.length - 1; i++) {
            const current = allHistory[i];
            const next = allHistory[i + 1];
            if (current.opportunity_id === next.opportunity_id) {
                const duration = new Date(next.changed_at).getTime() -
                    new Date(current.changed_at).getTime();
                const key = `stage_${current.new_stage_id}`;
                if (!durations[key]) {
                    durations[key] = { total: 0, count: 0 };
                }
                durations[key].total += duration;
                durations[key].count += 1;
            }
        }
        const averages = Object.entries(durations).map(([key, data]) => ({
            stage_id: Number(key.split('_')[1]),
            avg_time_ms: data.total / data.count,
        }));
        return averages;
    }
    async getReportByOwner() {
        const opportunities = await this.opportunityRepository.find({
            where: { is_deleted: false },
            relations: ['owner'],
        });
        const report = opportunities.reduce((acc, opp) => {
            const ownerId = opp.owner.user_id;
            if (!acc[ownerId]) {
                acc[ownerId] = {
                    owner: opp.owner,
                    totalDeals: 0,
                    wonDeals: 0,
                    totalRevenue: 0,
                };
            }
            acc[ownerId].totalDeals += 1;
            if (opp.is_won) {
                acc[ownerId].wonDeals += 1;
                acc[ownerId].totalRevenue += opp.amount;
            }
            return acc;
        }, {});
        return Object.values(report);
    }
};
exports.OpportunitiesService = OpportunitiesService;
exports.OpportunitiesService = OpportunitiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(opportunity_entity_1.Opportunity)),
    __param(1, (0, typeorm_1.InjectRepository)(opportunitytask_entity_1.OpportunityTask)),
    __param(2, (0, typeorm_1.InjectRepository)(task_entity_1.Task)),
    __param(3, (0, typeorm_1.InjectRepository)(funnel_stage_entity_1.SalesFunnelStage)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        opportunity_stage_history_service_1.OpportunityStageHistoryService])
], OpportunitiesService);
//# sourceMappingURL=opportunities.service.js.map