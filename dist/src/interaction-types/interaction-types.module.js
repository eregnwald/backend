"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractionTypesModule = void 0;
const common_1 = require("@nestjs/common");
const interaction_types_service_1 = require("./interaction-types.service");
const interaction_types_controller_1 = require("./interaction-types.controller");
let InteractionTypesModule = class InteractionTypesModule {
};
exports.InteractionTypesModule = InteractionTypesModule;
exports.InteractionTypesModule = InteractionTypesModule = __decorate([
    (0, common_1.Module)({
        controllers: [interaction_types_controller_1.InteractionTypesController],
        providers: [interaction_types_service_1.InteractionTypesService],
    })
], InteractionTypesModule);
//# sourceMappingURL=interaction-types.module.js.map