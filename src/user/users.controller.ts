import { Controller, Get, HttpException, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

    @Get('/')
    async cGetAll(@Res() res: Response) {
        const users = await this.userService.getAll();
        if (!users) throw new HttpException({ errorMessage: 'error.not_found' }, StatusCodes.NOT_FOUND);
        return res.send({ data: users });
    }
}
