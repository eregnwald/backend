import { CreateInteractionDetailDto } from './dto/create-interaction-detail.dto';
import { UpdateInteractionDetailDto } from './dto/update-interaction-detail.dto';
export declare class InteractionDetailsService {
    create(createInteractionDetailDto: CreateInteractionDetailDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateInteractionDetailDto: UpdateInteractionDetailDto): string;
    remove(id: number): string;
}
