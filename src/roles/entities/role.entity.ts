import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserRole } from '../../user-roles/entities/user-role.entity';
import { RolePermission } from '../../role-permissions/entities/role-permission.entity';
import { User } from 'src/users/entities/user.entity';
@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('increment')
  role_id: number;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  role_name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => UserRole, userRole => userRole.role)
  userRoles: UserRole[];

  @OneToMany(() => RolePermission, rolePermission => rolePermission.role)
  rolePermissions: RolePermission[];

  @OneToMany(() => User, user => user.role)
  users: User[];
}