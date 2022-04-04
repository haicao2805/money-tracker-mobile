import * as Joi from 'joi';
import { ApiProperty } from '@nestjs/swagger';
export class LoginDTO {
    @ApiProperty({ description: 'Username', example: 'haicao' })
    username: string;

    @ApiProperty({ description: 'Password', example: 'Aa123456' })
    password: string;
}

export const vLoginDTO = Joi.object({
    username: Joi.string().min(5).max(32).lowercase().trim().alphanum().required(),
    password: Joi.string().min(5).max(32).trim().alphanum().required(),
});
