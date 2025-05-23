"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTaskPriorityDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_task_priority_dto_1 = require("./create-task-priority.dto");
class UpdateTaskPriorityDto extends (0, mapped_types_1.PartialType)(create_task_priority_dto_1.CreateTaskPriorityDto) {
}
exports.UpdateTaskPriorityDto = UpdateTaskPriorityDto;
//# sourceMappingURL=update-task-priority.dto.js.map