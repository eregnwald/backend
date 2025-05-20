import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DocumentLinksService } from './document-links.service';
import { CreateDocumentLinkDto } from './dto/create-document-link.dto';
import { UpdateDocumentLinkDto } from './dto/update-document-link.dto';

@Controller('document-links')
export class DocumentLinksController {
  constructor(private readonly documentLinksService: DocumentLinksService) {}

  @Post()
  create(@Body() createDocumentLinkDto: CreateDocumentLinkDto) {
    return this.documentLinksService.create(createDocumentLinkDto);
  }

  @Get()
  findAll() {
    return this.documentLinksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.documentLinksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDocumentLinkDto: UpdateDocumentLinkDto) {
    return this.documentLinksService.update(+id, updateDocumentLinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.documentLinksService.remove(+id);
  }
}
