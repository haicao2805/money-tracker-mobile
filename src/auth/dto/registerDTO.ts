import * as Joi from 'joi';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDTO {
    @ApiProperty({ description: 'Username', example: 'haicao' })
    username: string;

    @ApiProperty({ description: 'Name', example: 'Cao Chi Hai' })
    name: string;

    @ApiProperty({ description: 'Password', example: 'Aa123456' })
    password: string;

    @ApiProperty({ description: 'Confirm password', example: 'Aa123456' })
    confirmPassword: string;
}

export const vRegisterDTO = Joi.object({
    name: Joi.string().min(5).max(40).trim().lowercase().required(),
    username: Joi.string().max(32).min(5).lowercase().trim().alphanum().required(),
    password: Joi.string().min(8).max(32).trim().alphanum().required(),
    confirmPassword: Joi.string().min(8).max(32).trim().alphanum().required().valid(Joi.ref('password')),
});
