import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessTokenRepository } from './entity/accessToken.repository';

@Module({
    imports: [TypeOrmModule.forFeature([AccessTokenRepository]), UserModule],
    controllers: [AuthController],
    providers: [
        AuthService,
        {
            provide: JwtService,
            useFactory: () => {
                return new JwtService({ secret: process.env.JWT_SECRET });
            },
        },
    ],
})
export class AuthModule {}
