import { PartialType } from '@nestjs/mapped-types';
import { CreateInteractionTypeDto } from './create-interaction-type.dto';

export class UpdateInteractionTypeDto extends PartialType(CreateInteractionTypeDto) {}
