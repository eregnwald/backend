import { InteractionsService } from './interactions.service';
import { CreateInteractionDto } from './dto/create-interaction.dto';
import { UpdateInteractionDto } from './dto/update-interaction.dto';
export declare class InteractionsController {
    private readonly interactionsService;
    constructor(interactionsService: InteractionsService);
    create(createInteractionDto: CreateInteractionDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateInteractionDto: UpdateInteractionDto): string;
    remove(id: string): string;
}
