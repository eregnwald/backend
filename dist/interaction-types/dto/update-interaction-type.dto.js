"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateInteractionTypeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_interaction_type_dto_1 = require("./create-interaction-type.dto");
class UpdateInteractionTypeDto extends (0, mapped_types_1.PartialType)(create_interaction_type_dto_1.CreateInteractionTypeDto) {
}
exports.UpdateInteractionTypeDto = UpdateInteractionTypeDto;
//# sourceMappingURL=update-interaction-type.dto.js.map