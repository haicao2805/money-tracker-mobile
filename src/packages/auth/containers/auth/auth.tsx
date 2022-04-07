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
                <Button w="50%" _pressed={{ bg: "primary.500" }} my={2}>
                    <Link to={{ screen: "Login" }}>
                        <Text color="white">Login</Text>
                    </Link>
                </Button>
                <Button w="50%" _pressed={{ bg: "primary.500" }} my={2}>
                    <Link to={{ screen: "Register" }}>
                        <Text color="white">Register</Text>
                    </Link>
                </Button>
            </Box>
        </Box>
    );
};

export default Auth;
