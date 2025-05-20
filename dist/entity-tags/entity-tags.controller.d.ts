import { EntityTagsService } from './entity-tags.service';
import { CreateEntityTagDto } from './dto/create-entity-tag.dto';
import { UpdateEntityTagDto } from './dto/update-entity-tag.dto';
export declare class EntityTagsController {
    private readonly entityTagsService;
    constructor(entityTagsService: EntityTagsService);
    create(createEntityTagDto: CreateEntityTagDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateEntityTagDto: UpdateEntityTagDto): string;
    remove(id: string): string;
}
