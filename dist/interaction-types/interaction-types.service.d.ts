import { CreateInteractionTypeDto } from './dto/create-interaction-type.dto';
import { UpdateInteractionTypeDto } from './dto/update-interaction-type.dto';
export declare class InteractionTypesService {
    create(createInteractionTypeDto: CreateInteractionTypeDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateInteractionTypeDto: UpdateInteractionTypeDto): string;
    remove(id: number): string;
}
