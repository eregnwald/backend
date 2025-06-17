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
exports.NotesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const note_entity_1 = require("./entities/note.entity");
const common_2 = require("@nestjs/common");
let NotesService = class NotesService {
    noteRepository;
    constructor(noteRepository) {
        this.noteRepository = noteRepository;
    }
    async create(dto) {
        const note = this.noteRepository.create(dto);
        return await this.noteRepository.save(note);
    }
    async findAllByOpportunityId(opportunityId) {
        return await this.noteRepository.find({
            where: { opportunity_id: opportunityId },
            order: { created_at: 'DESC' },
        });
    }
    async findOne(id) {
        const note = await this.noteRepository.findOneBy({ note_id: id });
        if (!note) {
            throw new common_2.NotFoundException(`Заметка с ID ${id} не найдена`);
        }
        return note;
    }
    async update(id, dto) {
        await this.noteRepository.update(id, dto);
        return await this.findOne(id);
    }
    async remove(id) {
        await this.noteRepository.delete(id);
    }
};
exports.NotesService = NotesService;
exports.NotesService = NotesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(note_entity_1.Note)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], NotesService);
//# sourceMappingURL=notes.service.js.map