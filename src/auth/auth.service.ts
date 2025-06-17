// src/auth/auth.service.ts
import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  private refreshTokensStore = new Map<string, string>(); 

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async refreshTokens(userId: string, refreshToken: string) {
    const storedToken = this.refreshTokensStore.get(userId);
    if (!storedToken || storedToken !== refreshToken) {
      throw new UnauthorizedException('Недействительный refresh token');
    }

    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: jwtConstants.refreshSecret,
      });

     
      const numericUserId = parseInt(userId, 10);
      if (isNaN(numericUserId)) {
        throw new UnauthorizedException('Неверный формат userId');
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
        secret: jwtConstants.secret,
        expiresIn: '1m',
      });

      return {
        access_token: accessToken,
        refresh_token: refreshToken, 
      };
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw new UnauthorizedException('Пользователь не найден');
      }
      throw new UnauthorizedException('Невалидный или просроченный refresh token');
    }
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password_hash))) {
      const { password_hash, ...result } = user;
      return result;
    }

    throw new UnauthorizedException('Неверные учетные данные');
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      userId: user.user_id,
      sub: user.user_id,
      first_name: user.first_name,
      roles: user.role ? [user.role.role_name] : [],
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: jwtConstants.secret,
      expiresIn: '1m', 
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: jwtConstants.refreshSecret,
      expiresIn: '7d',
    });

    this.refreshTokensStore.set(user.user_id, refreshToken);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
}