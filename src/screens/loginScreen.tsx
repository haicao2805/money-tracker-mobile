import { FC } from "react";
import AuthLayout from "../packages/auth/AuthLayout";
import { Login } from "../packages/auth/containers/auth/login";

interface LoginScreenProps {}

export const LoginScreen: FC<LoginScreenProps> = () => {
    return (
        <AuthLayout>
            <Login />
        </AuthLayout>
    );
};
