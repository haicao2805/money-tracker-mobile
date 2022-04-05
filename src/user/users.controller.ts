import { QueryJoiValidatorPipe } from './../core/pipe/queryValidator.pipe';
import { FilterUsersDTO, vFilterUsersDto } from './dto/filterUsers.dto';
import { Controller, Get, HttpException, Query, Res, UsePipes } from '@nestjs/common';
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

    @Get('/search')
    @UsePipes(new QueryJoiValidatorPipe(vFilterUsersDto))
    async filterUsers(@Query() queries: FilterUsersDTO, @Res() res: Response) {
        const { name, currentPage, pageSize } = queries;

        // filter user
        const users = await this.userService.filterUsers('%' + name + '%', (currentPage - 1) * pageSize, pageSize);
        return res.send({ data: users });
    }
}
