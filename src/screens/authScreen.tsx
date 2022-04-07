import { FC } from "react";
import AuthLayout from "../packages/auth/AuthLayout";
import Auth from "../packages/auth/containers/auth/auth";

interface AuthScreenProps {}

export const AuthScreen: FC<AuthScreenProps> = () => {
    return (
        <AuthLayout>
            <Auth />
        </AuthLayout>
    );
};
