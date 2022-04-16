import { FC } from "react";
import AuthLayout from "../../core/components/layout/authLayout";
import { Register } from "../../packages/auth/containers";

interface RegisterScreenProps {}

export const RegisterScreen: FC<RegisterScreenProps> = () => {
    return <Register />;
};
