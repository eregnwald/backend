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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("./constants");
let AuthService = class AuthService {
    usersService;
    jwtService;
    refreshTokensStore = new Map();
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async refreshTokens(userId, refreshToken) {
        const storedToken = this.refreshTokensStore.get(userId);
        if (!storedToken || storedToken !== refreshToken) {
            throw new common_1.UnauthorizedException('Недействительный refresh token');
        }
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: constants_1.jwtConstants.refreshSecret,
            });
            const numericUserId = parseInt(userId, 10);
            if (isNaN(numericUserId)) {
                throw new common_1.UnauthorizedException('Неверный формат userId');
            }
            const user = await this.usersService.findOne(numericUserId);
            const newPayload = {
                email: user.email,
                userId: user.user_id,
                sub: user.user_id,
                first_name: user.first_name,
                roles: user.role ? [user.role.role_name] : [],
            };
            const accessToken = this.jwtService.sign(newPayload, {
                secret: constants_1.jwtConstants.secret,
                expiresIn: '1m',
            });
            return {
                access_token: accessToken,
                refresh_token: refreshToken,
            };
        }
        catch (err) {
            if (err instanceof common_1.NotFoundException) {
                throw new common_1.UnauthorizedException('Пользователь не найден');
            }
            throw new common_1.UnauthorizedException('Невалидный или просроченный refresh token');
        }
    }
    async validateUser(email, password) {
        const user = await this.usersService.findByEmail(email);
        if (user && (await bcrypt.compare(password, user.password_hash))) {
            const { password_hash, ...result } = user;
            return result;
        }
        throw new common_1.UnauthorizedException('Неверные учетные данные');
    }
    async login(user) {
        const payload = {
            email: user.email,
            userId: user.user_id,
            sub: user.user_id,
            first_name: user.first_name,
            roles: user.role ? [user.role.role_name] : [],
        };
        const accessToken = this.jwtService.sign(payload, {
            secret: constants_1.jwtConstants.secret,
            expiresIn: '1m',
        });
        const refreshToken = this.jwtService.sign(payload, {
            secret: constants_1.jwtConstants.refreshSecret,
            expiresIn: '7d',
        });
        this.refreshTokensStore.set(user.user_id, refreshToken);
        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map