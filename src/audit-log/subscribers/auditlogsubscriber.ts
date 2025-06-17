import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
  RemoveEvent,
} from 'typeorm';
import { AuditLog } from '../entities/audit-log.entity';
import { AppDataSource } from 'src/data-source';

@EventSubscriber()
export class AuditLogSubscriber implements EntitySubscriberInterface<any> {
  listenTo() {
    return Object; // Слушаем все сущности
  }

  async afterInsert(event: InsertEvent<any>) {
    const entity = event.entity;
    const newValues = event.entity;
    await this.createAuditLog('CREATE', entity);
  }

  async afterUpdate(event: UpdateEvent<any>) {
    const entity = event.entity;

    if (!entity) return;

    console.log('Entity type:', entity.constructor?.name);
    console.log('Entity keys:', Object.keys(entity));
    console.log('Entity values:', entity);

    const oldValues = event.databaseEntity;
    const newValues = event.entity;

    await this.createAuditLog('UPDATE', entity, oldValues, newValues);
  }

  async afterRemove(event: RemoveEvent<any>) {
    const entity = event.entity;
    await this.createAuditLog('DELETE', entity, entity);
  }

  private async createAuditLog(
    action: string,
    entity: any,
    oldValues?: any,
    newValues?: any,
  ) {
    try {
      // Проверяем тип entity
      if (!entity || typeof entity !== 'object') {
        console.warn(`[AuditLog] Invalid entity passed. Skipping.`);
        return;
      }

      const entityType = entity.constructor?.name || typeof entity;

      // Получаем ID универсально — независимо от его имени (id, user_id и т.д.)
      const entityId = Number(this.getEntityId(entity, oldValues)) || this.getEntityId(oldValues);

      if (!entityId) {
        console.warn(`[AuditLog] Entity ID not found for ${entityType}. Skipping.`);
        return;
      }

      const auditLogRepository = AppDataSource.getRepository(AuditLog);

      const auditLog = auditLogRepository.create({
        entity_type: entityType,
        entity_id: entityId,
        action,
        old_values: oldValues ? this.sanitize(oldValues) : null,
        new_values: newValues ? this.sanitize(newValues) : null,
      });

      await auditLogRepository.save(auditLog);
    } catch (error) {
      console.error('[AuditLog] Failed to save audit log:', error);
    }
  }

  /**
   * Автоматически находит первичный ключ у любой сущности
   */
  private getEntityId(entity: any, fallback?: any): number | string | null {
    if (!entity || typeof entity !== 'object') {
      return null;
    }

    try {
      const constructor = entity.constructor;

      // Защита от анонимных объектов
      if (!constructor || !constructor.name || constructor.name === 'Object') {
        // Если entity является простым объектом, используем fallback
        if (fallback) {
          return this.getEntityId(fallback);
        }
        return null;
      }

      if (constructor.name === 'User') {
        return entity.user_id ?? null;
      }

      const metadata = AppDataSource.getMetadata(constructor.name);
      const idColumns = metadata.primaryColumns.map((col) => col.propertyName);

      for (const key of idColumns) {
        if (entity[key] !== undefined && entity[key] !== null) {
          return entity[key];
        }
      }

      return null;
    } catch (error) {
      console.warn(`[AuditLog] Failed to extract ID from entity`, error);
      return null;
    }
  }

  /**
   * Убирает чувствительные данные из логов
   */
  private sanitize(obj: any): any {
    if (!obj) return null;

    const clone = { ...obj };
    delete clone.password;
    delete clone.hash;
    delete clone.token;

    return clone;
  }
}