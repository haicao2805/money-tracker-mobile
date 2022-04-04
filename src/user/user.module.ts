import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../core/repositories';
import { AuthModule } from '../auth/auth.module';
import { UsersController } from './users.controller';
import { EmailService, CustomLoggerService } from '../core/services';
import { MailService } from '@sendgrid/mail';
import { config } from '../core';

@Module({
    imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([UserRepository])],
    controllers: [UserController, UsersController],
    providers: [
        UserService,
        {
            provide: MailService,
            useFactory: () => {
                const mailService = new MailService();
                mailService.setApiKey(config.SENDGRID_KEY);
                return mailService;
            },
        },
        EmailService,
        CustomLoggerService,
    ],
    exports: [UserService, TypeOrmModule],
})
export class UserModule {}
