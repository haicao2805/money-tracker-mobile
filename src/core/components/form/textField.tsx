import { Box, IInputProps, Input, Text } from "native-base";
import { ColorType } from "native-base/lib/typescript/components/types";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";

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
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
                <Box mb={2} w="100%">
                    <Text
                        color={labelColor ? labelColor : "black"}
                        fontWeight="medium"
                        fontSize="md"
                        mb={1}
                    >
                        {label}
                    </Text>
                    <Input
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        {...rest}
                    />
                    {Boolean(errors[name]?.message) && (
                        <Text color="red.500">{errors[name]?.message}</Text>
                    )}
                </Box>
            )}
            name={name}
        />
    );
};

export default TextFieldInput;
