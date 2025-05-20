import { PartialType } from '@nestjs/mapped-types';
import { CreateDocumentLinkDto } from './create-document-link.dto';

export class UpdateDocumentLinkDto extends PartialType(CreateDocumentLinkDto) {}
