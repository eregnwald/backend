import { CreateEntityTagDto } from './dto/create-entity-tag.dto';
import { UpdateEntityTagDto } from './dto/update-entity-tag.dto';
export declare class EntityTagsService {
    create(createEntityTagDto: CreateEntityTagDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateEntityTagDto: UpdateEntityTagDto): string;
    remove(id: number): string;
}
