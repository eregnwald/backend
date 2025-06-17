"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateEntityTagDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_entity_tag_dto_1 = require("./create-entity-tag.dto");
class UpdateEntityTagDto extends (0, mapped_types_1.PartialType)(create_entity_tag_dto_1.CreateEntityTagDto) {
}
exports.UpdateEntityTagDto = UpdateEntityTagDto;
//# sourceMappingURL=update-entity-tag.dto.js.map