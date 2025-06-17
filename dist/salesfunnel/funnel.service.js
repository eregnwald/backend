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
exports.SalesFunnelsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const funnel_entity_1 = require("./funnel.entity");
const funnel_stage_entity_1 = require("../salesfunnelstages/funnel-stage.entity");
const funnel_stage_service_1 = require("../salesfunnelstages/funnel-stage.service");
let SalesFunnelsService = class SalesFunnelsService {
    funnelRepository;
    funnelStageRepository;
    funnelStageService;
    constructor(funnelRepository, funnelStageRepository, funnelStageService) {
        this.funnelRepository = funnelRepository;
        this.funnelStageRepository = funnelStageRepository;
        this.funnelStageService = funnelStageService;
    }
    async onModuleInit() {
        await this.getDefaultSharedFunnel().catch((err) => {
            console.error('Ошибка при создании общей воронки:', err);
        });
    }
    async getCurrentUserFunnel(owner_id) {
        const existing = await this.funnelRepository.findOneBy({ owner_id });
        if (existing) {
            return existing;
        }
        return this.createDefaultFunnel(owner_id);
    }
    async create(dto) {
        const funnel = this.funnelRepository.create(dto);
        const savedFunnel = await this.funnelRepository.save(funnel);
        await this.createDefaultStages(savedFunnel.funnel_id);
        return savedFunnel;
    }
    async createDefaultStages(funnel_id) {
        const stages = [
            { stage_name: 'Первичный контакт', is_closed: false, is_won: false },
            { stage_name: 'Переговоры', is_closed: false, is_won: false },
            { stage_name: 'Принимают решение', is_closed: false, is_won: false },
            { stage_name: 'Успешно закрыта', is_closed: true, is_won: true },
            { stage_name: 'Закрыта и нереализована', is_closed: true, is_won: false },
        ];
        for (const [index, stage] of stages.entries()) {
            await this.funnelStageService.create(funnel_id, {
                stage_name: stage.stage_name,
                is_closed: stage.is_closed,
                is_won: stage.is_won,
                position: index + 1,
            });
        }
    }
    async getDefaultSharedFunnel() {
        let sharedFunnel = await this.funnelRepository.findOne({
            where: { is_shared: true },
        });
        if (!sharedFunnel) {
            sharedFunnel = this.funnelRepository.create({
                funnel_name: 'Общая воронка',
                is_shared: true,
                owner_id: null,
            });
            sharedFunnel = await this.funnelRepository.save(sharedFunnel);
            await this.createDefaultStages(sharedFunnel.funnel_id);
        }
        return sharedFunnel;
    }
    async getSharedFunnels() {
        return this.funnelRepository.find({
            where: { is_shared: true },
        });
    }
    async findOne(id) {
        const funnel = await this.funnelRepository.findOneBy({ funnel_id: id });
        if (!funnel) {
            throw new Error(`Воронка с ID ${id} не найдена`);
        }
        return funnel;
    }
    async findAll() {
        return this.funnelRepository.find();
    }
    async getFunnelsByOwnerId(owner_id) {
        return this.funnelRepository.find({
            where: { owner_id },
        });
    }
    async getFunnelsByUserId(userId) {
        return this.funnelRepository.find({
            where: { owner_id: userId },
        });
    }
    async createDefaultFunnel(owner_id) {
        const funnel = this.funnelRepository.create({
            funnel_name: 'Моя воронка',
            owner_id,
            is_shared: false,
        });
        const savedFunnel = await this.funnelRepository.save(funnel);
        await this.createDefaultStages(savedFunnel.funnel_id);
        return savedFunnel;
    }
    async getStagesForFunnel(funnel_id) {
        return this.funnelStageRepository.find({
            where: { funnel_id },
            order: { position: 'ASC' },
        });
    }
};
exports.SalesFunnelsService = SalesFunnelsService;
exports.SalesFunnelsService = SalesFunnelsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(funnel_entity_1.SalesFunnel)),
    __param(1, (0, typeorm_1.InjectRepository)(funnel_stage_entity_1.SalesFunnelStage)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        funnel_stage_service_1.SalesFunnelStagesService])
], SalesFunnelsService);
//# sourceMappingURL=funnel.service.js.map