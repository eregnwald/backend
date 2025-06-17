import { Module } from '@nestjs/common';
import { EntityTagsService } from './entity-tags.service';
import { EntityTagsController } from './entity-tags.controller';

@Module({
  controllers: [EntityTagsController],
  providers: [EntityTagsService],
})
export class EntityTagsModule {}
