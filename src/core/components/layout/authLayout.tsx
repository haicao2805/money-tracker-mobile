import { useNavigation } from "@react-navigation/native";
import React, { FC } from "react";
import { UserRole } from "../../models/user";
import { useStoreUser } from "../../store";

interface AuthLayoutProps {
    // acceptRoles: Array<UserRole>;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
    const user = useStoreUser();
    const navigation = useNavigation();
    React.useEffect(() => {
        if (!user.isLogin) {
            navigation.navigate("Auth");
        }
    }, []);

    return <>{children}</>;
};

export default AuthLayout;
