import { FC } from "react";
import { useForm } from "react-hook-form";
import { FormWrapper } from "../../../../core/components/form";
import { LoginDTO } from "./action";
import FormErrorMessage from "../../../../core/components/form/formErrorMessage";
import { Box, Button, Image } from "native-base";
import TextFieldInput from "../../../../core/components/form/textField";
import FormButton from "../../../../core/components/form/formButton";

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
        <Box flex={1} bg="gray.200">
            <Box justifyContent="center" alignItems="center">
                <Image
                    source={require("../../../../../assets/logo/android-icon-144x144.png")}
                    alt="#"
                />
            </Box>
            <FormWrapper methods={methods}>
                <FormErrorMessage />
                <Box>
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

                    <Box justifyContent="center" alignItems="center">
                        <FormButton
                            label="Login"
                            onPress={methods.handleSubmit(_handleOnSubmit)}
                        />
                    </Box>
                </Box>
            </FormWrapper>
        </Box>
    );
};
