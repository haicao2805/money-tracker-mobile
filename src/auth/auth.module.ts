import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { GoogleStrategy } from './passport/google.strategy';

@Module({
    imports: [forwardRef(() => UserModule)],
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
    exports: [AuthService],
})
export class AuthModule {}
