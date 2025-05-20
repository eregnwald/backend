import { Injectable } from '@nestjs/common';
import { CreateDocumentLinkDto } from './dto/create-document-link.dto';
import { UpdateDocumentLinkDto } from './dto/update-document-link.dto';

@Injectable()
export class DocumentLinksService {
  create(createDocumentLinkDto: CreateDocumentLinkDto) {
    return 'This action adds a new documentLink';
  }

  findAll() {
    return `This action returns all documentLinks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} documentLink`;
  }

  update(id: number, updateDocumentLinkDto: UpdateDocumentLinkDto) {
    return `This action updates a #${id} documentLink`;
  }

  remove(id: number) {
    return `This action removes a #${id} documentLink`;
  }
}
