import { CreateInteractionDto } from './dto/create-interaction.dto';
import { UpdateInteractionDto } from './dto/update-interaction.dto';
export declare class InteractionsService {
    create(createInteractionDto: CreateInteractionDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateInteractionDto: UpdateInteractionDto): string;
    remove(id: number): string;
}
