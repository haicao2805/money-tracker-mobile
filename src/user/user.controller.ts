import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get('/test')
    async test(@Res() res: Response) {
        const user = new User();
        user.username = 'haicao';
        user.password = '1232';
        const savedUser = await this.userService.saveUser(user);
        return res.send(savedUser);
    }

    @Get('/find')
    async find(@Res() res: Response) {
        const user = await this.userService.findUsers('username', 'haicao');
        return res.send(user);
    }
}
