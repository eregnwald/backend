import { PartialType } from '@nestjs/mapped-types';
import { CreateInteractionDetailDto } from './create-interaction-detail.dto';

export class UpdateInteractionDetailDto extends PartialType(CreateInteractionDetailDto) {}
