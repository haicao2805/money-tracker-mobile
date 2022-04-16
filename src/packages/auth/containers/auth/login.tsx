import { FC } from "react";
import { useForm } from "react-hook-form";
import { FormWrapper } from "../../../../core/components/form";
import { authAction, LoginDTO } from "./action";
import FormErrorMessage from "../../../../core/components/form/formErrorMessage";
import { Box, Image, Text } from "native-base";
import TextFieldInput from "../../../../core/components/form/textField";
import FormButton from "../../../../core/components/form/formButton";
import { Link, useNavigation } from "@react-navigation/native";
import { store } from "../../../../core/store";
import { userActions } from "../../../../core/store/userStore";

interface LoginProps {}

const defaultValues: LoginDTO = {
    password: "",
    email: "",
};

export const Login: FC<LoginProps> = () => {
    const methods = useForm<LoginDTO>({
        defaultValues,
    });
    const navigation = useNavigation();

    const _handleOnSubmit = async (values: LoginDTO) => {
        try {
            const res = await authAction.login(values);
            if (res?.token) {
                store.dispatch(userActions.updateLogin());
                navigation.navigate("Root");
            }
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

                        <FormErrorMessage />

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
                <Text mt={4}>
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
