import { FC } from "react";
import Auth from "../../packages/auth/containers/auth/auth";

interface AuthScreenProps {}

export const AuthScreen: FC<AuthScreenProps> = () => {
    return <Auth />;
};
