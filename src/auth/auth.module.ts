import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessTokenRepository } from './entity/accessToken.repository';
import { GoogleStrategy } from './passport/google.strategy';

@Module({
    imports: [TypeOrmModule.forFeature([AccessTokenRepository]), UserModule],
    controllers: [AuthController],
    providers: [
        AuthService,
        GoogleStrategy,
        {
            provide: JwtService,
            useFactory: () => {
                return new JwtService({ secret: process.env.JWT_SECRET });
            },
        },
    ],
})
export class AuthModule {}
