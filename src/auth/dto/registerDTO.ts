import * as Joi from 'joi';

export class RegisterDTO {
    username: string;
    name: string;
    password: string;
    confirmPassword: string;
}

export const vRegisterDTO = Joi.object({
    name: Joi.string().min(5).max(40).trim().lowercase().required(),
    username: Joi.string().max(32).min(5).lowercase().trim().alphanum().required(),
    password: Joi.string().min(8).max(32).trim().alphanum().required(),
    confirmPassword: Joi.string().min(8).max(32).trim().alphanum().required().valid(Joi.ref('password')),
});
