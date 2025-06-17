export declare class CreateAuditLogDto {
    entity_type: string;
    entity_id: number;
    action: string;
    old_values?: any;
    new_values?: any;
}
