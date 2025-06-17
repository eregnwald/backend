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
exports.OpportunityStagesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const opportunity_stage_entity_1 = require("./entities/opportunity-stage.entity");
let OpportunityStagesService = class OpportunityStagesService {
    stageRepository;
    constructor(stageRepository) {
        this.stageRepository = stageRepository;
    }
    async findAll() {
        return await this.stageRepository.find();
    }
    async findOne(id) {
        const stage = await this.stageRepository.findOneBy({ stage_id: id });
        if (!stage) {
            throw new Error(`Stage with ID ${id} not found`);
        }
        return stage;
    }
    async create(data) {
        const stage = this.stageRepository.create(data);
        return await this.stageRepository.save(stage);
    }
    async update(id, data) {
        const stage = await this.findOne(id);
        Object.assign(stage, data);
        return await this.stageRepository.save(stage);
    }
    async remove(id) {
        const result = await this.stageRepository.delete(id);
        if (result.affected === 0) {
            throw new Error(`Stage with ID ${id} not found`);
        }
    }
};
exports.OpportunityStagesService = OpportunityStagesService;
exports.OpportunityStagesService = OpportunityStagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(opportunity_stage_entity_1.OpportunityStage)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OpportunityStagesService);
//# sourceMappingURL=opportunity-stages.service.js.map