import { Body, Controller, Get, Post, Req, Res, UseGuards, UsePipes } from '@nestjs/common';
import { Request, Response } from 'express';
import { apiResponse } from '../core/interface/apiResponse';
import { JoiValidatorPipe } from '../core/validator/validator.pipe';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

import { LoginDTO, vLoginDTO, RegisterDTO, vRegisterDTO } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { constant } from '../core/constant';
import { User } from '../core/models';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

    @Post('/register')
    @UsePipes(new JoiValidatorPipe(vRegisterDTO))
    async cRegister(@Body() body: RegisterDTO, @Res() res: Response) {
        const user = await this.userService.findUser('username', body.username);

        if (user) {
            throw apiResponse.sendError({ details: { username: { type: 'field.field-taken' } } }, 'BadRequestException');
        }

        const newUser = new User();
        newUser.name = body.name;
        newUser.username = body.username;
        newUser.password = await this.authService.encryptPassword(body.password, 10);
        const insertedUser = await this.userService.saveUser(newUser);

        const accessToken = await this.authService.createAccessToken(insertedUser);
        return res.cookie('access-token', accessToken, { maxAge: constant.authController.registerCookieTime }).send();
    }

    @Post('/login')
    @UsePipes(new JoiValidatorPipe(vLoginDTO))
    async cLogin(@Body() body: LoginDTO, @Res() res: Response) {
        const user = await this.userService.findUser('username', body.username);
        if (!user) {
            throw apiResponse.sendError({ details: { errorMessage: { type: 'error.invalid-password-username' } } }, 'BadRequestException');
        }

        const isCorrectPassword = await this.authService.decryptPassword(body.password, user.password);
        if (!isCorrectPassword) {
            throw apiResponse.sendError({ details: { errorMessage: { type: 'error.invalid-password-username' } } }, 'BadRequestException');
        }

        const accessToken = await this.authService.createAccessToken(user);
        return res.cookie('access-token', accessToken, { maxAge: constant.authController.loginCookieTime }).send();
    }

    // ---------------------------3rd authentication---------------------------
    @Get('/google')
    @UseGuards(AuthGuard('google'))
    cGoogleAuth() {
        //
    }

    @Get('/google/callback')
    @UseGuards(AuthGuard('google'))
    async cGoogleAuthRedirect(@Req() req: Request, @Res() res: Response) {
        console.log(req.user);
        const accessToken = await this.authService.createAccessToken(req.user as User);
        return res.cookie('re-token', accessToken, { maxAge: constant.authController.googleUserCookieTime }).redirect(process.env.CLIENT_URL);
    }
}
