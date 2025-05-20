import { RolePermissionsService } from './role-permissions.service';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role-permission.dto';
export declare class RolePermissionsController {
    private readonly rolePermissionsService;
    constructor(rolePermissionsService: RolePermissionsService);
    create(createRolePermissionDto: CreateRolePermissionDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateRolePermissionDto: UpdateRolePermissionDto): string;
    remove(id: string): string;
}
