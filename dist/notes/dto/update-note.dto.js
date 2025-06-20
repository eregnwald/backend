"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateNoteDto = void 0;
const create_note_dto_1 = require("./create-note.dto");
const mapped_types_1 = require("@nestjs/mapped-types");
class UpdateNoteDto extends (0, mapped_types_1.PartialType)(create_note_dto_1.CreateNoteDto) {
}
exports.UpdateNoteDto = UpdateNoteDto;
//# sourceMappingURL=update-note.dto.js.map