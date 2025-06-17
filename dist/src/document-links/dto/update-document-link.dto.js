"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateDocumentLinkDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_document_link_dto_1 = require("./create-document-link.dto");
class UpdateDocumentLinkDto extends (0, mapped_types_1.PartialType)(create_document_link_dto_1.CreateDocumentLinkDto) {
}
exports.UpdateDocumentLinkDto = UpdateDocumentLinkDto;
//# sourceMappingURL=update-document-link.dto.js.map