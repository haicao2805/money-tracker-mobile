import { QueryJoiValidatorPipe } from './../core/pipe/queryValidator.pipe';
import { FilterUsersDTO, vFilterUsersDto } from './dto/filterUsers.dto';
import { Controller, Get, Query, Res, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
    constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

    @Get('/search')
    @UsePipes(new QueryJoiValidatorPipe(vFilterUsersDto))
    async filterUsers(@Query() queries: FilterUsersDTO, @Res() res: Response) {
        const { name, currentPage, pageSize } = queries;

        // filter user
        const users = await this.userService.filterUsers(name, currentPage, pageSize);
        return res.send(users);
    }
}
