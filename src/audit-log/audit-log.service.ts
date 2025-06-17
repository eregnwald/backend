// services/audit-log.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './entities/audit-log.entity';
import { CreateAuditLogDto } from './dto/create-audit-log.dto';
import { UpdateAuditLogDto } from './dto/update-audit-log.dto';

@Injectable()
export class AuditLogService {
  constructor(
    @InjectRepository(AuditLog)
    private readonly auditLogRepository: Repository<AuditLog>,
  ) {}

  // audit.service.ts
  async getLogsByEntity(entityType: string, entityId: string | number) {
    return this.auditLogRepository.find({
      where: {
        entity_type: entityType,
        entity_id: entityId,
      },
      relations: ['user'],
      order: { timestamp: 'DESC' },
    });
  }

  async create(createAuditLogDto: CreateAuditLogDto): Promise<AuditLog> {
    const auditLog = this.auditLogRepository.create(createAuditLogDto);
    return this.auditLogRepository.save(auditLog);
  }

  async findAll(): Promise<AuditLog[]> {
    return this.auditLogRepository.find();
  }

  async findOne(id: number): Promise<AuditLog | null > {
    return this.auditLogRepository.findOneBy({ log_id: id });
  }

  async update(id: number, updateAuditLogDto: UpdateAuditLogDto): Promise<AuditLog> {
    const auditLog = await this.auditLogRepository.preload({
      log_id: id,
      ...updateAuditLogDto,
    });
    if (!auditLog) {
      throw new Error(`Audit log with ID ${id} not found`);
    }
    return this.auditLogRepository.save(auditLog);
  }

  async remove(id: number): Promise<void> {
    await this.auditLogRepository.delete(id);
  }
}