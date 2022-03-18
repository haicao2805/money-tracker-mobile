import * as Joi from 'joi';

export class LoginDTO {
    username: string;
    password: string;
}

export const vLoginDTO = Joi.object({
    username: Joi.string().max(32).min(5).lowercase().trim().alphanum().required(),
    password: Joi.string().min(8).max(32).trim().alphanum().required(),
});
