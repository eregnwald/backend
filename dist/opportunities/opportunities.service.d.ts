import { Repository } from 'typeorm';
import { Opportunity } from './entities/opportunity.entity';
import { CreateOpportunityDto } from './dto/create-opportunity.dto';
import { UpdateOpportunityDto } from './dto/update-opportunity.dto';
export declare class OpportunitiesService {
    private readonly opportunityRepository;
    constructor(opportunityRepository: Repository<Opportunity>);
    create(dto: CreateOpportunityDto): Promise<Opportunity>;
    findAll(): Promise<Opportunity[]>;
    findOne(id: number): Promise<Opportunity>;
    update(id: number, dto: UpdateOpportunityDto): Promise<Opportunity>;
    remove(id: number): Promise<void>;
    restore(id: number): Promise<Opportunity>;
}
