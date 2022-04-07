import { User, userSchema } from "../../../../core/models/user";
import Joi from "joi";
import { http } from "../../../../core/api/http";

export interface LoginDTO extends Pick<User, "email" | "password"> {
    email: string;
    password: string;
}

export const loginSchema = Joi.object<LoginDTO>({
    email: userSchema.email,
    password: userSchema.password,
});
export interface RegisterDTO extends Pick<User, "email" | "password"> {
    email: string;
    password: string;
    confirmPassword: string;
}

export const registerSchema = Joi.object<RegisterDTO>({
    email: userSchema.email,
    password: userSchema.password,
    confirmPassword: Joi.string().required().valid(Joi.ref("password")),
});

export const authAction = {
    login: async (input: LoginDTO) => {
        const res = await http.post("/auth/login");
        return res.data;
    },
};
