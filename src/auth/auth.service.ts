import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { AccessToken } from '../core/models/accessToken';
import { AccessTokenRepository } from '../core/repositories/accessToken';
import { User } from '../core/models';
@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService, private readonly accessTokenRepository: AccessTokenRepository) {}

    // ---------------------------Bcrypt Service---------------------------
    async encryptPassword(password: string, saltOrRounds: number): Promise<string> {
        return await bcrypt.hash(password, saltOrRounds);
    }

    async decryptPassword(enteredPassword: string, passwordInDatabase: string): Promise<boolean> {
        return await bcrypt.compare(enteredPassword, passwordInDatabase);
    }

    // ---------------------------Token Service---------------------------
    encryptAccessToken(tokenData: Record<any, any>) {
        try {
            return this.jwtService.sign(JSON.stringify(tokenData));
        } catch (err) {
            return null;
        }
    }

    verifyToken<T>(tokenData: string) {
        try {
            return this.jwtService.verify<any>(tokenData) as T;
        } catch (err) {
            return null;
        }
    }

    async createAccessToken(user: User): Promise<string> {
        const token = this.encryptAccessToken(user);
        const accessToken = new AccessToken();
        accessToken.token = token;
        accessToken.userId = user.id;

        await this.accessTokenRepository.delete({ userId: user.id });
        const insertedAccessToken = await this.accessTokenRepository.save(accessToken);

        return insertedAccessToken.id;
    }
}
