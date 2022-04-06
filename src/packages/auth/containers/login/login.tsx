import { FC } from "react";
import { useForm } from "react-hook-form";
import { FormWrapper } from "../../../../core/components/form";
import { authAction, LoginDTO, loginSchema } from "./action";
import { joiResolver } from "@hookform/resolvers/joi";
import FormErrorMessage from "../../../../core/components/form/formErrorMessage";
import { Box, Button } from "native-base";
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
        // resolver: joiResolver(loginSchema), error here, I don't know why
    });

    const _handleOnSubmit = async (data: LoginDTO) => {
        console.log(data);
    };

    return (
        <FormWrapper methods={methods}>
            <FormErrorMessage />
            <Box>
                <TextFieldInput label="Email" name="email" />
                <TextFieldInput label="Password" name="password" />
                <FormButton
                    label="Submit"
                    onPress={methods.handleSubmit(_handleOnSubmit)}
                />
            </Box>
        </FormWrapper>
    );
};
