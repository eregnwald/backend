import { UserRole } from '../../user-roles/entities/user-role.entity';
import { RolePermission } from '../../role-permissions/entities/role-permission.entity';
import { User } from 'src/users/entities/user.entity';
export declare class Role {
    role_id: number;
    role_name: string;
    description: string;
    userRoles: UserRole[];
    rolePermissions: RolePermission[];
    users: User[];
}
