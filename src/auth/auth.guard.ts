import { CanActivate, ExecutionContext, HttpException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User, UserRole } from '../core/models';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UserService } from '../user/user.service';

@Injectable()
export class UseGuard implements CanActivate {
    constructor(private readonly authService: AuthService, private readonly userService: UserService, private readonly reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req: Request = context.switchToHttp().getRequest();
        const res: Response = context.switchToHttp().getResponse();
        const roles = this.reflector.get<UserRole[]>('roles', context.getHandler()) || [];

        const authorization = req.headers['authorization'] || '';
        const token = this.getTokenFromHeader(authorization);

        const tokenInfo = await this.authService.verifyToken<{ id: string }>(token);
        if (!tokenInfo || !tokenInfo.id) {
            throw new HttpException({}, StatusCodes.UNAUTHORIZED);
        }

        const user = await this.userService.findUser('id', tokenInfo.id);

        if (!user) {
            throw new HttpException({}, StatusCodes.UNAUTHORIZED);
        }

        if (roles.length && !roles.includes(user.role)) {
            throw new HttpException({}, StatusCodes.UNAUTHORIZED);
        }

        user.password = '';
        req.user = user;

        return true;
    }

    getTokenFromHeader(authorization: string): string {
        const accessToken = authorization.split(' ')[1];
        return accessToken;
    }
}
