import { Body, Controller, Get, HttpException, Post, Req, Res, UseGuards, UsePipes } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { Request, Response } from 'express';

import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { StatusCodes } from 'http-status-codes';
import { LoginDTO, vLoginDTO, RegisterDTO, vRegisterDTO } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { constant } from '../core/constant';
import { User } from '../core/models';
import { JoiValidatorPipe } from '../core/pipe/validator.pipe';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

    @Post('/register')
    @ApiOperation({ summary: 'Create new user' })
    @ApiCreatedResponse({ type: String, description: 'access token' })
    @UsePipes(new JoiValidatorPipe(vRegisterDTO))
    async cRegister(@Body() body: RegisterDTO, @Res() res: Response) {
        const user = await this.userService.findUser('email', body.email);
        if (user) throw new HttpException({ username: 'field.field-taken' }, StatusCodes.BAD_REQUEST);

        const newUser = new User();
        newUser.name = body.name;
        newUser.email = body.email;
        newUser.password = await this.authService.encryptPassword(body.password, 10);

        const insertedUser = await this.userService.saveUser(newUser);

        const accessToken = await this.authService.createAccessToken(insertedUser);
        return res.send({ token: accessToken });
    }

    @Post('/login')
    @ApiOperation({ summary: 'Login' })
    @ApiCreatedResponse({ type: String, description: 'access token' })
    @UsePipes(new JoiValidatorPipe(vLoginDTO))
    async cLogin(@Body() body: LoginDTO, @Res() res: Response) {
        const user = await this.userService.findUser('email', body.email);
        if (!user) throw new HttpException({ errorMessage: 'error.invalid-password-email' }, StatusCodes.BAD_REQUEST);

        const isCorrectPassword = await this.authService.decryptPassword(body.password, user.password);
        if (!isCorrectPassword) throw new HttpException({ errorMessage: 'error.invalid-password-email' }, StatusCodes.BAD_REQUEST);

        const accessToken = await this.authService.createAccessToken(user);
        return res.send({ token: accessToken });
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
