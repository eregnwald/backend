"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentLinksModule = void 0;
const common_1 = require("@nestjs/common");
const document_links_service_1 = require("./document-links.service");
const document_links_controller_1 = require("./document-links.controller");
let DocumentLinksModule = class DocumentLinksModule {
};
exports.DocumentLinksModule = DocumentLinksModule;
exports.DocumentLinksModule = DocumentLinksModule = __decorate([
    (0, common_1.Module)({
        controllers: [document_links_controller_1.DocumentLinksController],
        providers: [document_links_service_1.DocumentLinksService],
    })
], DocumentLinksModule);
//# sourceMappingURL=document-links.module.js.map