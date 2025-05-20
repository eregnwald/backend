import { Module } from '@nestjs/common';
import { DocumentLinksService } from './document-links.service';
import { DocumentLinksController } from './document-links.controller';

@Module({
  controllers: [DocumentLinksController],
  providers: [DocumentLinksService],
})
export class DocumentLinksModule {}
