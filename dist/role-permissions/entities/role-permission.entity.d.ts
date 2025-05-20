import { Role } from '../../roles/entities/role.entity';
import { Permission } from '../../permissions/entities/permission.entity';
export declare class RolePermission {
    role_id: number;
    permission_id: number;
    role: Role;
    permission: Permission;
}
