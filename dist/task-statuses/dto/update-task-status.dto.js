"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTaskStatusDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_task_status_dto_1 = require("./create-task-status.dto");
class UpdateTaskStatusDto extends (0, mapped_types_1.PartialType)(create_task_status_dto_1.CreateTaskStatusDto) {
}
exports.UpdateTaskStatusDto = UpdateTaskStatusDto;
//# sourceMappingURL=update-task-status.dto.js.map