"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLogService = void 0;
const common_1 = require("@nestjs/common");
let AuditLogService = class AuditLogService {
    create(createAuditLogDto) {
        return 'This action adds a new auditLog';
    }
    findAll() {
        return `This action returns all auditLog`;
    }
    findOne(id) {
        return `This action returns a #${id} auditLog`;
    }
    update(id, updateAuditLogDto) {
        return `This action updates a #${id} auditLog`;
    }
    remove(id) {
        return `This action removes a #${id} auditLog`;
    }
};
exports.AuditLogService = AuditLogService;
exports.AuditLogService = AuditLogService = __decorate([
    (0, common_1.Injectable)()
], AuditLogService);
//# sourceMappingURL=audit-log.service.js.map