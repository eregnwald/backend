import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Opportunity } from './entities/opportunity.entity';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';

@Injectable()
export class OpportunitiesService {
  constructor(
    @InjectRepository(Opportunity)
    private readonly opportunityRepository: Repository<Opportunity>,
  ) {}

  async create(dto: CreateOpportunityDto): Promise<Opportunity> {
    const opportunity = this.opportunityRepository.create(dto);
    return await this.opportunityRepository.save(opportunity);
  }

  async findAll(): Promise<Opportunity[]> {
  const opportunities = await this.opportunityRepository.find({
    where: { is_deleted: false },
    relations: ['account', 'contact', 'stage', 'owner'],
  });
  return opportunities || [];
}

  async findOne(id: number): Promise<Opportunity> {
  const opportunity = await this.opportunityRepository.findOne({
    where: { opportunity_id: id },
    relations: ['account', 'contact', 'stage', 'owner'],
  });

  if (!opportunity) {
    throw new Error(`Opportunity with ID ${id} not found`);
  }

  return opportunity;
}

  async update(id: number, dto: UpdateOpportunityDto): Promise<Opportunity> {
  const opportunity = await this.findOne(id);

  // Если переданы ID, TypeORM сам проставит связи
  Object.entries(dto).forEach(([key, value]) => {
    if (value !== undefined) {
      opportunity[key] = value;
    }
  });

  return await this.opportunityRepository.save(opportunity);
}
  // Мягкое удаление
  async remove(id: number): Promise<void> {
    const opportunity = await this.opportunityRepository.findOneBy({ opportunity_id: id });

    if (!opportunity) {
      throw new Error(`Opportunity with ID ${id} not found`);
    }

    opportunity.is_deleted = true;
    await this.opportunityRepository.save(opportunity);
  }

  // Восстановление
  async restore(id: number): Promise<Opportunity> {
    const opportunity = await this.opportunityRepository.findOneBy({ opportunity_id: id });

    if (!opportunity) {
      throw new Error(`Opportunity with ID ${id} not found`);
    }

    opportunity.is_deleted = false;
    return await this.opportunityRepository.save(opportunity);
  }
}
