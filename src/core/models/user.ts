import Joi from "joi";

export enum UserStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
}

export enum UserRole {
    ADMIN = "admin",
    USER = "user",
}
export interface User {
    id: string;
    name: string;
    password: string;
    email: string;
    isVerified: boolean;
    googleId: string;
    createDate: string;
    updateDate: string;
    status: UserStatus;
    role: UserRole;
}

export const userSchema = {
    email: Joi.string().min(1).max(255).required(),
    password: Joi.string().min(1).max(255).required(),
    name: Joi.string().min(1).max(255).required(),
};
