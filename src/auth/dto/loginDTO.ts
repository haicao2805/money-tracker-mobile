import * as joi from 'joi';
import { ApiProperty } from '@nestjs/swagger';
import { userValidateSchema } from '../../core/models';
export class LoginDTO {
    @ApiProperty({ description: 'Username', example: 'haicao' })
    username: string;

    @ApiProperty({ description: 'Password', example: 'Aa123456' })
    password: string;
}

export const vLoginDTO = joi.object<LoginDTO>({
    username: userValidateSchema.username,
    password: userValidateSchema.password,
});
