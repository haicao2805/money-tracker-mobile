import * as joi from 'joi';
import { ApiProperty } from '@nestjs/swagger';
import { userValidateSchema } from '../../core/models';
export class LoginDTO {
    @ApiProperty({ description: 'Email', example: 'hai@gmail.com' })
    email: string;

    @ApiProperty({ description: 'Password', example: 'Aa123456' })
    password: string;
}

export const vLoginDTO = joi.object<LoginDTO>({
    email: joi.string().trim().max(32).min(5).email().required(),
    password: userValidateSchema.password,
});
