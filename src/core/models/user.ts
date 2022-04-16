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
