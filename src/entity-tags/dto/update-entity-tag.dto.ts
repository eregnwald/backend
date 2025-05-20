import { PartialType } from '@nestjs/mapped-types';
import { CreateEntityTagDto } from './create-entity-tag.dto';

export class UpdateEntityTagDto extends PartialType(CreateEntityTagDto) {}
