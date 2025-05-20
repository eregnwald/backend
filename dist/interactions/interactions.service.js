"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractionsService = void 0;
const common_1 = require("@nestjs/common");
let InteractionsService = class InteractionsService {
    create(createInteractionDto) {
        return 'This action adds a new interaction';
    }
    findAll() {
        return `This action returns all interactions`;
    }
    findOne(id) {
        return `This action returns a #${id} interaction`;
    }
    update(id, updateInteractionDto) {
        return `This action updates a #${id} interaction`;
    }
    remove(id) {
        return `This action removes a #${id} interaction`;
    }
};
exports.InteractionsService = InteractionsService;
exports.InteractionsService = InteractionsService = __decorate([
    (0, common_1.Injectable)()
], InteractionsService);
//# sourceMappingURL=interactions.service.js.map