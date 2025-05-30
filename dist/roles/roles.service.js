"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const role_entity_1 = require("./entities/role.entity");
const common_2 = require("@nestjs/common");
const role_permission_entity_1 = require("../role-permissions/entities/role-permission.entity");
const permission_entity_1 = require("../permissions/entities/permission.entity");
let RolesService = class RolesService {
    rolesRepository;
    rolePermissionsRepository;
    permissionsRepository;
    constructor(rolesRepository, rolePermissionsRepository, permissionsRepository) {
        this.rolesRepository = rolesRepository;
        this.rolePermissionsRepository = rolePermissionsRepository;
        this.permissionsRepository = permissionsRepository;
    }
    async create(createRoleDto) {
        const role = this.rolesRepository.create(createRoleDto);
        return this.rolesRepository.save(role);
    }
    async findAll() {
        return this.rolesRepository.find();
    }
    async findOne(id) {
        const role = await this.rolesRepository.findOne({ where: { role_id: id }, relations: ['rolePermissions', 'rolePermissions.permission'] });
        if (!role) {
            throw new common_2.NotFoundException(`Role with ID ${id} not found`);
        }
        return role;
    }
    async update(id, updateRoleDto) {
        const role = await this.findOne(id);
        await this.rolesRepository.update(id, updateRoleDto);
        return this.findOne(id);
    }
    async remove(id) {
        const role = await this.findOne(id);
        await this.rolesRepository.delete(id);
    }
    async assignPermissionToRole(roleId, permissionId) {
        const rolePermission = this.rolePermissionsRepository.create({ role_id: roleId, permission_id: permissionId });
        return this.rolePermissionsRepository.save(rolePermission);
    }
};
exports.RolesService = RolesService;
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __param(1, (0, typeorm_1.InjectRepository)(role_permission_entity_1.RolePermission)),
    __param(2, (0, typeorm_1.InjectRepository)(permission_entity_1.Permission)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], RolesService);
//# sourceMappingURL=roles.service.js.map