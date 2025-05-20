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
let OpportunitiesService = class OpportunitiesService {
    opportunityRepository;
    constructor(opportunityRepository) {
        this.opportunityRepository = opportunityRepository;
    }
    async create(dto) {
        const opportunity = this.opportunityRepository.create(dto);
        return await this.opportunityRepository.save(opportunity);
    }
    async findAll() {
        const opportunities = await this.opportunityRepository.find({
            where: { is_deleted: false },
            relations: ['account', 'contact', 'stage', 'owner'],
        });
        return opportunities || [];
    }
    async findOne(id) {
        const opportunity = await this.opportunityRepository.findOne({
            where: { opportunity_id: id },
            relations: ['account', 'contact', 'stage', 'owner'],
        });
        if (!opportunity) {
            throw new Error(`Opportunity with ID ${id} not found`);
        }
        return opportunity;
    }
    async update(id, dto) {
        const opportunity = await this.findOne(id);
        Object.entries(dto).forEach(([key, value]) => {
            if (value !== undefined) {
                opportunity[key] = value;
            }
        });
        return await this.opportunityRepository.save(opportunity);
    }
    async remove(id) {
        const opportunity = await this.opportunityRepository.findOneBy({ opportunity_id: id });
        if (!opportunity) {
            throw new Error(`Opportunity with ID ${id} not found`);
        }
        opportunity.is_deleted = true;
        await this.opportunityRepository.save(opportunity);
    }
    async restore(id) {
        const opportunity = await this.opportunityRepository.findOneBy({ opportunity_id: id });
        if (!opportunity) {
            throw new Error(`Opportunity with ID ${id} not found`);
        }
        opportunity.is_deleted = false;
        return await this.opportunityRepository.save(opportunity);
    }
};
exports.OpportunitiesService = OpportunitiesService;
exports.OpportunitiesService = OpportunitiesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(opportunity_entity_1.Opportunity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OpportunitiesService);
//# sourceMappingURL=opportunities.service.js.map