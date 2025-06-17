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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = require("bcryptjs");
const user_role_entity_1 = require("../user-roles/entities/user-role.entity");
const funnel_service_1 = require("../salesfunnel/funnel.service");
const role_entity_1 = require("../roles/entities/role.entity");
const common_2 = require("@nestjs/common");
let UsersService = class UsersService {
    usersRepository;
    funnelService;
    userRolesRepository;
    rolesRepository;
    constructor(usersRepository, funnelService, userRolesRepository, rolesRepository) {
        this.usersRepository = usersRepository;
        this.funnelService = funnelService;
        this.userRolesRepository = userRolesRepository;
        this.rolesRepository = rolesRepository;
    }
    async create(userData) {
        console.log('[UsersService] Creating user with data:', userData);
        const user = this.usersRepository.create(userData);
        const savedUser = await this.usersRepository.save(user);
        console.log('[UsersService] User created and saved:', savedUser);
        return savedUser;
    }
    async register(dto) {
        if (!dto.password) {
            throw new Error('Пароль не указан');
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const role = await this.rolesRepository.findOneBy({ role_id: dto.role_id });
        if (!role) {
            throw new common_2.HttpException('Роль не найдена', common_2.HttpStatus.NOT_FOUND);
        }
        const user = await this.create({
            username: dto.username,
            email: dto.email,
            first_name: dto.first_name,
            last_name: dto.last_name,
            password_hash: hashedPassword,
            role,
        });
        if (user?.user_id) {
            await this.funnelService.createDefaultFunnel(user.user_id);
        }
        return user;
    }
    async findAll(currentUser) {
        const currentUserRoles = currentUser?.roles || [];
        const isUser = currentUserRoles.includes('user');
        const userId = currentUser?.sub;
        const queryBuilder = this.usersRepository.createQueryBuilder('user')
            .leftJoinAndSelect('user.role', 'role');
        if (!currentUserRoles.includes('admin')) {
            queryBuilder.where('role.role_name != :adminRole', { adminRole: 'admin' });
        }
        if (isUser && userId) {
            queryBuilder.andWhere('user.user_id = :userId', { userId });
        }
        return await queryBuilder.getMany();
    }
    async findOne(id) {
        const user = await this.usersRepository.findOne({
            where: { user_id: id },
            relations: ['role'],
        });
        if (!user) {
            throw new common_2.NotFoundException(`Пользователь с ID ${id} не найден`);
        }
        return user;
    }
    async findProfileById(userId) {
        const user = await this.usersRepository.findOne({
            where: { user_id: userId },
            select: ['user_id', 'username', 'first_name', 'last_name', 'email'],
        });
        if (!user) {
            throw new common_2.NotFoundException('Пользователь не найден');
        }
        return user;
    }
    async update(id, updateUserDto) {
        const user = await this.findOne(id);
        if (updateUserDto.role_id !== undefined) {
            const role = await this.rolesRepository.findOneBy({ role_id: updateUserDto.role_id });
            if (!role) {
                throw new common_2.HttpException('Роль не найдена', common_2.HttpStatus.NOT_FOUND);
            }
            user.role = role;
            delete updateUserDto.role_id;
        }
        Object.assign(user, updateUserDto);
        return await this.usersRepository.save(user);
    }
    async remove(id) {
        const result = await this.usersRepository.delete(id);
        if (result.affected === 0) {
            throw new common_2.NotFoundException(`Пользователь с ID ${id} не найден`);
        }
    }
    async findByEmail(email) {
        const user = await this.usersRepository.findOne({
            where: { email },
            relations: ['role'],
        });
        return user || null;
    }
    async assignRoleToUser(userId, roleId) {
        await this.userRolesRepository.insert({ user_id: userId, role_id: roleId });
        return this.findOne(userId);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(user_role_entity_1.UserRole)),
    __param(3, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        funnel_service_1.SalesFunnelsService,
        typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map