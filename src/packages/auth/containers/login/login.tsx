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
        <Box flex={1}>
            <Box justifyContent="center" alignItems="center" pt="10%">
                <Image
                    source={require("../../../../../assets/logo/android-icon-144x144.png")}
                    alt="#"
                />
            </Box>
            <Box justifyContent="center" alignItems="center">
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
                        />

                        <FormButton
                            label="Login"
                            onPress={methods.handleSubmit(_handleOnSubmit)}
                            w="80%"
                        />
                    </Box>
                </FormWrapper>{" "}
            </Box>
        </Box>
    );
};
