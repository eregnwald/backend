"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateInteractionDetailDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_interaction_detail_dto_1 = require("./create-interaction-detail.dto");
class UpdateInteractionDetailDto extends (0, mapped_types_1.PartialType)(create_interaction_detail_dto_1.CreateInteractionDetailDto) {
}
exports.UpdateInteractionDetailDto = UpdateInteractionDetailDto;
//# sourceMappingURL=update-interaction-detail.dto.js.map