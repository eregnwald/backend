"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditLogSubscriber = void 0;
const typeorm_1 = require("typeorm");
const audit_log_entity_1 = require("../entities/audit-log.entity");
const data_source_1 = require("../../data-source");
let AuditLogSubscriber = class AuditLogSubscriber {
    listenTo() {
        return Object;
    }
    async afterInsert(event) {
        const entity = event.entity;
        const newValues = event.entity;
        await this.createAuditLog('CREATE', entity);
    }
    async afterUpdate(event) {
        const entity = event.entity;
        if (!entity)
            return;
        console.log('Entity type:', entity.constructor?.name);
        console.log('Entity keys:', Object.keys(entity));
        console.log('Entity values:', entity);
        const oldValues = event.databaseEntity;
        const newValues = event.entity;
        await this.createAuditLog('UPDATE', entity, oldValues, newValues);
    }
    async afterRemove(event) {
        const entity = event.entity;
        await this.createAuditLog('DELETE', entity, entity);
    }
    async createAuditLog(action, entity, oldValues, newValues) {
        try {
            if (!entity || typeof entity !== 'object') {
                console.warn(`[AuditLog] Invalid entity passed. Skipping.`);
                return;
            }
            const entityType = entity.constructor?.name || typeof entity;
            const entityId = Number(this.getEntityId(entity, oldValues)) || this.getEntityId(oldValues);
            if (!entityId) {
                console.warn(`[AuditLog] Entity ID not found for ${entityType}. Skipping.`);
                return;
            }
            const auditLogRepository = data_source_1.AppDataSource.getRepository(audit_log_entity_1.AuditLog);
            const auditLog = auditLogRepository.create({
                entity_type: entityType,
                entity_id: entityId,
                action,
                old_values: oldValues ? this.sanitize(oldValues) : null,
                new_values: newValues ? this.sanitize(newValues) : null,
            });
            await auditLogRepository.save(auditLog);
        }
        catch (error) {
            console.error('[AuditLog] Failed to save audit log:', error);
        }
    }
    getEntityId(entity, fallback) {
        if (!entity || typeof entity !== 'object') {
            return null;
        }
        try {
            const constructor = entity.constructor;
            if (!constructor || !constructor.name || constructor.name === 'Object') {
                if (fallback) {
                    return this.getEntityId(fallback);
                }
                return null;
            }
            if (constructor.name === 'User') {
                return entity.user_id ?? null;
            }
            const metadata = data_source_1.AppDataSource.getMetadata(constructor.name);
            const idColumns = metadata.primaryColumns.map((col) => col.propertyName);
            for (const key of idColumns) {
                if (entity[key] !== undefined && entity[key] !== null) {
                    return entity[key];
                }
            }
            return null;
        }
        catch (error) {
            console.warn(`[AuditLog] Failed to extract ID from entity`, error);
            return null;
        }
    }
    sanitize(obj) {
        if (!obj)
            return null;
        const clone = { ...obj };
        delete clone.password;
        delete clone.hash;
        delete clone.token;
        return clone;
    }
};
exports.AuditLogSubscriber = AuditLogSubscriber;
exports.AuditLogSubscriber = AuditLogSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)()
], AuditLogSubscriber);
//# sourceMappingURL=auditlogsubscriber.js.map