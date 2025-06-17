import { User } from '../../users/entities/user.entity';
export declare class AuditLog {
    log_id: number;
    user: User | null;
    entity_type: string;
    entity_id: string | number;
    action: string;
    old_values: any;
    new_values: any;
    timestamp: Date;
}
