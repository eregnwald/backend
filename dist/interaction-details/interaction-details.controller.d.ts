import { InteractionDetailsService } from './interaction-details.service';
import { CreateInteractionDetailDto } from './dto/create-interaction-detail.dto';
import { UpdateInteractionDetailDto } from './dto/update-interaction-detail.dto';
export declare class InteractionDetailsController {
    private readonly interactionDetailsService;
    constructor(interactionDetailsService: InteractionDetailsService);
    create(createInteractionDetailDto: CreateInteractionDetailDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateInteractionDetailDto: UpdateInteractionDetailDto): string;
    remove(id: string): string;
}
