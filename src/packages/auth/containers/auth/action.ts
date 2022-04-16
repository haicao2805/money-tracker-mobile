import { User } from "../../../../core/models/user";
import { http } from "../../../../core/api/http";
import { AxiosResponse } from "axios";

export interface LoginDTO {
    email: string;
    password: string;
}

export interface RegisterDTO {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface LoginResponse {
    token: string;
}
interface RegisterResponse {
    token: string;
}

const login = async (values: LoginDTO): Promise<LoginResponse | null> => {
    try {
        const res = await http.post("/auth/login", values);
        return res.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

const register = async (
    values: RegisterDTO
): Promise<RegisterResponse | null> => {
    try {
        const res = await http.post("/auth/register", values);
        return res.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const authAction = { login, register };
