import { Link } from "@react-navigation/native";
import { Box, Image, Text } from "native-base";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { FormWrapper } from "../../../../core/components/form";
import FormButton from "../../../../core/components/form/formButton";
import FormErrorMessage from "../../../../core/components/form/formErrorMessage";
import TextFieldInput from "../../../../core/components/form/textField";
import { authAction, RegisterDTO } from "./action";

interface RegisterProps {}

const defaultValues: RegisterDTO = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
};

export const Register: FC<RegisterProps> = () => {
    const methods = useForm<RegisterDTO>({
        defaultValues,
    });

    const _handleOnSubmit = async (values: RegisterDTO) => {
        try {
            const res = await authAction.register(values);
            console.log(res?.token);
        } catch (error) {
            console.log(error);
            return null;
        }
    };

    return (
        <Box flex={1}>
            <Box justifyContent="center" alignItems="center">
                <FormWrapper methods={methods}>
                    <Box w="80%" justifyContent="center" alignItems="center">
                        <TextFieldInput
                            label="Name"
                            name="name"
                            borderColor="primary.500"
                        />

                        <TextFieldInput
                            label="Email"
                            name="email"
                            borderColor="primary.500"
                        />

                        <TextFieldInput
                            label="Password"
                            name="password"
                            borderColor="primary.500"
                        />

                        <TextFieldInput
                            label="Confirm password"
                            name="confirmPassword"
                            borderColor="primary.500"
                        />

                        <FormErrorMessage />

                        <FormButton
                            label="REGISTER"
                            onPress={methods.handleSubmit(_handleOnSubmit)}
                            w="80%"
                            mt={8}
                        />
                    </Box>
                </FormWrapper>
            </Box>

            <Box justifyContent="center" alignItems="center">
                <Text mt={4}>
                    Already have an account?{" "}
                    <Link to={{ screen: "Login" }}>
                        <Text color="primary.500">Login</Text>
                    </Link>
                </Text>
            </Box>
        </Box>
    );
};
