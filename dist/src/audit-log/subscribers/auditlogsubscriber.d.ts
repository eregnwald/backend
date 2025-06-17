import { EntitySubscriberInterface, InsertEvent, UpdateEvent, RemoveEvent } from 'typeorm';
export declare class AuditLogSubscriber implements EntitySubscriberInterface<any> {
    listenTo(): ObjectConstructor;
    afterInsert(event: InsertEvent<any>): Promise<void>;
    afterUpdate(event: UpdateEvent<any>): Promise<void>;
    afterRemove(event: RemoveEvent<any>): Promise<void>;
    private createAuditLog;
    private getEntityId;
    private sanitize;
}
