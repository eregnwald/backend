import { Module } from '@nestjs/common';
import { InteractionTypesService } from './interaction-types.service';
import { InteractionTypesController } from './interaction-types.controller';

@Module({
  controllers: [InteractionTypesController],
  providers: [InteractionTypesService],
})
export class InteractionTypesModule {}
