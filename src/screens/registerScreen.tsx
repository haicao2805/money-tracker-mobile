import { FC } from "react";
import AuthLayout from "../packages/auth/AuthLayout";
import { Register } from "../packages/auth/containers/auth/register";

interface RegisterScreenProps {}

export const RegisterScreen: FC<RegisterScreenProps> = () => {
    return (
        <AuthLayout>
            <Register />
        </AuthLayout>
    );
};
