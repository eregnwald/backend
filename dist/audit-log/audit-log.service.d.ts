import { Repository } from 'typeorm';
import { AuditLog } from './entities/audit-log.entity';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';
import { UpdateAuditLogDto } from './dto/update-audit-log.dto';
export declare class AuditLogService {
    private readonly auditLogRepository;
    constructor(auditLogRepository: Repository<AuditLog>);
    getLogsByEntity(entityType: string, entityId: string | number): Promise<AuditLog[]>;
    create(createAuditLogDto: CreateAuditLogDto): Promise<AuditLog>;
    findAll(): Promise<AuditLog[]>;
    findOne(id: number): Promise<AuditLog | null>;
    update(id: number, updateAuditLogDto: UpdateAuditLogDto): Promise<AuditLog>;
    remove(id: number): Promise<void>;
}
