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
        <Box mb={4} w="100%">
            <Text fontWeight="medium" fontSize="md" mb={2}>
                {label}
            </Text>
            <Input {...register(name)} {...rest} />
            {Boolean(errors[name]?.message) && (
                <Text>
                    {label} {errors[name]?.message}
                </Text>
            )}
        </Box>
    );
};

export default TextFieldInput;
