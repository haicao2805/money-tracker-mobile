import { FC } from "react";
import { useForm } from "react-hook-form";
import { FormWrapper } from "../../../../core/components/form";
import { LoginDTO } from "./action";
import FormErrorMessage from "../../../../core/components/form/formErrorMessage";
import { Box, Image, Text } from "native-base";
import TextFieldInput from "../../../../core/components/form/textField";
import FormButton from "../../../../core/components/form/formButton";
import { Link } from "@react-navigation/native";

interface LoginProps {}

const defaultValues: LoginDTO = {
    password: "",
    email: "",
};

export const Login: FC<LoginProps> = () => {
    const methods = useForm<LoginDTO>({
        defaultValues,
    });

    const _handleOnSubmit = async (data: LoginDTO) => {
        console.log(data);
    };

    return (
        <Box flex={1}>
            <Box justifyContent="center" alignItems="center" pt="10%">
                <Image
                    source={require("../../../../../assets/logo/android-icon-144x144.png")}
                    alt="#"
                />
            </Box>
            <Box justifyContent="center" alignItems="center">
                <Text color="primary.500" fontSize="2xl" fontWeight="bold">
                    Login
                </Text>
                <FormWrapper methods={methods}>
                    <Box w="80%" justifyContent="center" alignItems="center">
                        <FormErrorMessage />

                        <TextFieldInput
                            label="Email"
                            name="email"
                            borderColor="primary.500"
                        />

                        <TextFieldInput
                            label="Password"
                            name="password"
                            borderColor="primary.500"
                            type="password"
                        />

                        <FormButton
                            label="LOG IN"
                            onPress={methods.handleSubmit(_handleOnSubmit)}
                            w="80%"
                            mt={8}
                        />
                    </Box>
                </FormWrapper>
            </Box>

            <Box justifyContent="center" alignItems="center">
                <Text mt={8}>
                    Don't have an account?{" "}
                    <Link to={{ screen: "Register" }}>
                        <Text color="primary.500">Register</Text>
                    </Link>
                </Text>

                <Text mt={4}>
                    <Link to={{ screen: "ForgotPassword" }}>
                        <Text color="primary.500">
                            Forgotten your password?
                        </Text>
                    </Link>
                </Text>
            </Box>
        </Box>
    );
};
