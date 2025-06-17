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
exports.SalesFunnelStagesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const funnel_stage_entity_1 = require("./funnel-stage.entity");
const opportunity_entity_1 = require("../opportunities/entities/opportunity.entity");
let SalesFunnelStagesService = class SalesFunnelStagesService {
    funnelStageRepository;
    opportunityRepository;
    constructor(funnelStageRepository, opportunityRepository) {
        this.funnelStageRepository = funnelStageRepository;
        this.opportunityRepository = opportunityRepository;
    }
    async findAll(funnel_id) {
        return this.funnelStageRepository.find({
            where: { funnel_id },
            order: { position: 'ASC' },
        });
    }
    async findOne(stage_id) {
        const stage = await this.funnelStageRepository.findOneBy({ stage_id });
        if (!stage)
            throw new Error(`Stage with ID ${stage_id} not found`);
        return stage;
    }
    async create(funnel_id, dto) {
        const nextPosition = await this.getNextPosition(funnel_id);
        const stage = this.funnelStageRepository.create({
            ...dto,
            funnel_id,
            position: nextPosition,
            probability: dto.is_closed ? 100 : dto.probability ?? nextPosition * 25,
        });
        return this.funnelStageRepository.save(stage);
    }
    async update(stage_id, dto) {
        const stage = await this.findOne(stage_id);
        if (dto.stage_name !== undefined) {
            stage.stage_name = dto.stage_name;
        }
        if (dto.is_closed !== undefined) {
            stage.is_closed = dto.is_closed;
            if (dto.is_closed) {
                stage.probability = 100;
            }
        }
        if (dto.probability !== undefined && !stage.is_closed) {
            stage.probability = dto.probability;
        }
        return this.funnelStageRepository.save(stage);
    }
    async remove(stage_id) {
        const stage = await this.findOne(stage_id);
        const deals = await this.opportunityRepository.find({ where: { stage_id } });
        if (deals.length > 0) {
            let unresolvedStage = await this.funnelStageRepository.findOne({
                where: { funnel_id: stage.funnel_id, stage_name: 'Неразобранное' },
            });
            if (!unresolvedStage) {
                unresolvedStage = this.funnelStageRepository.create({
                    funnel_id: stage.funnel_id,
                    stage_name: 'Неразобранное',
                    position: (await this.funnelStageRepository.count()) + 1,
                    is_closed: false,
                    probability: 0,
                });
                await this.funnelStageRepository.save(unresolvedStage);
            }
            await this.opportunityRepository.update({ stage_id }, { stage_id: unresolvedStage.stage_id });
        }
        await this.funnelStageRepository.remove(stage);
        return { message: 'Stage removed successfully' };
    }
    async getNextPosition(funnel_id) {
        const count = await this.funnelStageRepository.count({ where: { funnel_id } });
        return count + 1;
    }
    async bulkUpdate(funnelId, dtos) {
        for (const dto of dtos) {
            const stage = await this.findOne(dto.stage_id);
            Object.assign(stage, dto);
            await this.funnelStageRepository.save(stage);
        }
        return this.findAll(funnelId);
    }
    async getStagesForFunnel(funnelId) {
        return this.funnelStageRepository.find({ where: { funnel_id: funnelId } });
    }
};
exports.SalesFunnelStagesService = SalesFunnelStagesService;
exports.SalesFunnelStagesService = SalesFunnelStagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(funnel_stage_entity_1.SalesFunnelStage)),
    __param(1, (0, typeorm_1.InjectRepository)(opportunity_entity_1.Opportunity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SalesFunnelStagesService);
//# sourceMappingURL=funnel-stage.service.js.map