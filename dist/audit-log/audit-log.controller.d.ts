import { AuditLogService } from './audit-log.service';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';
import { UpdateAuditLogDto } from './dto/update-audit-log.dto';
export declare class AuditLogController {
    private readonly auditLogService;
    constructor(auditLogService: AuditLogService);
    create(createAuditLogDto: CreateAuditLogDto): Promise<import("./entities/audit-log.entity").AuditLog>;
    findAll(): Promise<import("./entities/audit-log.entity").AuditLog[]>;
    findOne(id: string): Promise<import("./entities/audit-log.entity").AuditLog | null>;
    update(id: string, updateAuditLogDto: UpdateAuditLogDto): Promise<import("./entities/audit-log.entity").AuditLog>;
    remove(id: string): Promise<void>;
}
