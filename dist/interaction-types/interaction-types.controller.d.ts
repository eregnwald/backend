import { InteractionTypesService } from './interaction-types.service';
import { CreateInteractionTypeDto } from './dto/create-interaction-type.dto';
import { UpdateInteractionTypeDto } from './dto/update-interaction-type.dto';
export declare class InteractionTypesController {
    private readonly interactionTypesService;
    constructor(interactionTypesService: InteractionTypesService);
    create(createInteractionTypeDto: CreateInteractionTypeDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateInteractionTypeDto: UpdateInteractionTypeDto): string;
    remove(id: string): string;
}
