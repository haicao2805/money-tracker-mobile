import { Body, Controller, Get, HttpException, Param, Post, Req, Res, UseGuards } from '@nestjs/common';

import { UserService } from './user.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { UseGuard } from '../auth/auth.guard';
import { AuthService } from '../auth/auth.service';
import { SendVerifyEmailDTO } from './dto/sendverifyEmail.dto';
import { EmailService } from '../core/services';

@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService, private readonly authService: AuthService, private readonly emailService: EmailService) {}

    @Post('/send-verify-email')
    async cSendVerifyEmail(@Body() body: SendVerifyEmailDTO, @Res() res: Response) {
        const user = await this.userService.findUser('email', body.email);

        if (!user) {
            throw new HttpException({ errorMessage: 'error.not_found' }, StatusCodes.BAD_REQUEST);
        }

        // CREATE TOKEN here
        const otp = '123';

        const isSent = await this.emailService.sendEmailForVerify(user.email, otp);
        if (!isSent) throw new HttpException({ errorMessage: 'error.something_wrong' }, StatusCodes.INTERNAL_SERVER_ERROR);

        return res.send({ message: 'success' });
    }

    @Get('/verify/:otp')
    async cVerifyEmail(@Param('otp') otp: string, @Res() res: Response) {
        // FIX Verify logic here
        const { data, error } = await this.authService.verifyToken<{ id: string }>(otp);
        if (error) {
            throw new HttpException({ errorMessage: '' }, StatusCodes.UNAUTHORIZED);
        }

        const user = await this.userService.findUser('id', data.id);
        if (!user) {
            throw new HttpException({ errorMessage: '' }, StatusCodes.UNAUTHORIZED);
        }

        user.isVerified = true;
        await this.userService.saveUser(user);

        return res.send({});
    }

    @Get('/me')
    @UseGuards(UseGuard)
    async cGetMe(@Req() req: Request, @Res() res: Response) {
        return res.send(req.user);
    }

    @Get('/:userId')
    async cGetOneById(@Param('userId') userId: string, @Res() res: Response) {
        const user = await this.userService.findUser('id', userId);
        if (!user) throw new HttpException({ errorMessage: 'error.not_found' }, StatusCodes.NOT_FOUND);
        return res.send({ data: user });
    }
}
