import { Body, Controller, Post, Res, UsePipes } from '@nestjs/common';
import { Response } from 'express';
import { apiResponse } from '../app/interface/apiResponse';
import { JoiValidatorPipe } from '../util/validator/validator.pipe';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { RegisterDTO, vRegisterDTO } from './dto/RegisterDTO';
import { User } from 'src/user/entity/user.entity';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

    @Post('/register')
    @UsePipes(new JoiValidatorPipe(vRegisterDTO))
    async cRegister(@Body() body: RegisterDTO) {
        const user = await this.userService.findUser('username', body.username);

        if (user) {
            apiResponse.sendError({ details: { errorMessage: { type: 'username.exist' } } }, 'BadRequestException');
        }

        if (body.password !== body.confirmPassword) {
            apiResponse.sendError({ details: { errorMessage: { type: 'password.notMatch' } } }, 'BadRequestException');
        }

        const newUser = new User();
        newUser.name = body.name;
        newUser.username = body.username;
        const saltOrRounds = 10;
        newUser.password = await bcrypt.hash(body.password, saltOrRounds);

        // console.log(await bcrypt.compare(body.password, newUser.password));

        await this.userService.saveUser(newUser);

        return apiResponse.send({ data: newUser });
    }
}
