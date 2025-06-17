import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OpportunityStage } from './entities/opportunity-stage.entity';

@Injectable()
export class OpportunityStagesService {
  constructor(
    @InjectRepository(OpportunityStage)
    private readonly stageRepository: Repository<OpportunityStage>,
  ) {}

  async findAll(): Promise<OpportunityStage[]> {
    return await this.stageRepository.find();
  }

  async findOne(id: number): Promise<OpportunityStage> {
    const stage = await this.stageRepository.findOneBy({ stage_id: id });
    if (!stage) {
      throw new Error(`Stage with ID ${id} not found`);
    }
    return stage;
  }

  async create(data: { stage_name: string; is_closed?: boolean }): Promise<OpportunityStage> {
  const stage = this.stageRepository.create(data);
  return await this.stageRepository.save(stage);
}

async update(id: number, data: { stage_name?: string; is_closed?: boolean }): Promise<OpportunityStage> {
  const stage = await this.findOne(id);
  Object.assign(stage, data);
  return await this.stageRepository.save(stage);
}

  async remove(id: number): Promise<void> {
    const result = await this.stageRepository.delete(id);
    if (result.affected === 0) {
      throw new Error(`Stage with ID ${id} not found`);
    }
  }
}