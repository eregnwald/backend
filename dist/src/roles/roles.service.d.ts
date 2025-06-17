import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolePermission } from '../role-permissions/entities/role-permission.entity';
import { Permission } from '../permissions/entities/permission.entity';
export declare class RolesService {
    private rolesRepository;
    private rolePermissionsRepository;
    private permissionsRepository;
    constructor(rolesRepository: Repository<Role>, rolePermissionsRepository: Repository<RolePermission>, permissionsRepository: Repository<Permission>);
    create(createRoleDto: CreateRoleDto): Promise<Role>;
    findAll(): Promise<Role[]>;
    findOne(id: number): Promise<Role>;
    update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role>;
    remove(id: number): Promise<void>;
    assignPermissionToRole(roleId: number, permissionId: number): Promise<RolePermission>;
}
