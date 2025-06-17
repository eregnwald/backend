import { Module } from '@nestjs/common';
import { InteractionDetailsService } from './interaction-details.service';
import { InteractionDetailsController } from './interaction-details.controller';

@Module({
  controllers: [InteractionDetailsController],
  providers: [InteractionDetailsService],
})
export class InteractionDetailsModule {}
