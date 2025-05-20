"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractionTypesService = void 0;
const common_1 = require("@nestjs/common");
let InteractionTypesService = class InteractionTypesService {
    create(createInteractionTypeDto) {
        return 'This action adds a new interactionType';
    }
    findAll() {
        return `This action returns all interactionTypes`;
    }
    findOne(id) {
        return `This action returns a #${id} interactionType`;
    }
    update(id, updateInteractionTypeDto) {
        return `This action updates a #${id} interactionType`;
    }
    remove(id) {
        return `This action removes a #${id} interactionType`;
    }
};
exports.InteractionTypesService = InteractionTypesService;
exports.InteractionTypesService = InteractionTypesService = __decorate([
    (0, common_1.Injectable)()
], InteractionTypesService);
//# sourceMappingURL=interaction-types.service.js.map