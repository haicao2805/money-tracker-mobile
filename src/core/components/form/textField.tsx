import { Box, IInputProps, Input, Text } from "native-base";
import { ColorType } from "native-base/lib/typescript/components/types";
import { FC } from "react";
import { Controller, useForm, useFormContext } from "react-hook-form";

type TextFieldInputProps = {
    name: string;
    label: string;
    labelColor?: ColorType;
};

type TextFieldInputPropsExtends = TextFieldInputProps & IInputProps;

const TextFieldInput: FC<TextFieldInputPropsExtends> = ({
    name,
    label,
    labelColor,
    ...rest
}) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    return (
        <Box mb={2} w="100%">
            <Text
                color={labelColor ? labelColor : "black"}
                fontWeight="medium"
                fontSize="md"
                mb={1}
            >
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
