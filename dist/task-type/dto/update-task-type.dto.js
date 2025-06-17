"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTaskTypeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_task_type_dto_1 = require("./create-task-type.dto");
class UpdateTaskTypeDto extends (0, swagger_1.PartialType)(create_task_type_dto_1.CreateTaskTypeDto) {
}
exports.UpdateTaskTypeDto = UpdateTaskTypeDto;
//# sourceMappingURL=update-task-type.dto.js.map