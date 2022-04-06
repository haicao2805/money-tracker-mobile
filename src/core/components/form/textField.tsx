import { Box, IInputProps, Input, Text } from "native-base";
import { FC } from "react";
import { Controller, useForm, useFormContext } from "react-hook-form";

type TextFieldInputProps = {
    name: string;
    label: string;
};

type TextFieldInputPropsExtends = TextFieldInputProps & IInputProps;

const TextFieldInput: FC<TextFieldInputPropsExtends> = ({
    name,
    label,
    ...rest
}) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <Box mb={4} justifyContent="center" alignItems="center">
            <Box w="95%">
                <Text fontWeight="medium" fontSize="md">
                    {label}
                </Text>
                <Input {...register(name)} my={2} {...rest} />
                {Boolean(errors[name]?.message) && (
                    <Text>
                        {label} {errors[name]?.message}
                    </Text>
                )}
            </Box>
        </Box>
    );
};

export default TextFieldInput;
