import { Link } from "@react-navigation/native";
import { Box, Button, Image, Text } from "native-base";
import { FC } from "react";

interface AuthProps {}

const Auth: FC<AuthProps> = () => {
    return (
        <Box flex={1}>
            <Box justifyContent="center" alignItems="center" pt="10%">
                <Image
                    source={require("../../../../../assets/logo/android-icon-144x144.png")}
                    alt="#"
                />
            </Box>

            <Box justifyContent="center" alignItems="center">
                <Link
                    to={{ screen: "Login" }}
                    style={{
                        width: "50%",
                        backgroundColor: "#3ABB5E",
                        textAlign: "center",
                        marginBottom: 16,
                        paddingVertical: 16,
                        borderRadius: 100,
                    }}
                >
                    <Text color="white">Login</Text>
                </Link>

                <Link
                    to={{ screen: "Register" }}
                    style={{
                        width: "50%",
                        backgroundColor: "#3ABB5E",
                        textAlign: "center",
                        marginBottom: 16,
                        paddingVertical: 16,
                        borderRadius: 100,
                    }}
                >
                    <Text color="white">Register</Text>
                </Link>
            </Box>
        </Box>
    );
};

export default Auth;
