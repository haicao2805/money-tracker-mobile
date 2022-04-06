import { Box, Input, Text } from "native-base";
import { FC } from "react";
import { Controller, useForm, useFormContext } from "react-hook-form";

interface TextFieldInputProps {
    name: string;
    label: string;
}

const TextFieldInput: FC<TextFieldInputProps> = ({ name, label }) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
                <>
                    <Text>{label}</Text>
                    <Input
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                    />
                    {Boolean(errors[name]?.message) && (
                        <Text>
                            {label} {errors[name]?.message}
                        </Text>
                    )}
                </>
            )}
            name={name}
        />
    );
};

export default TextFieldInput;
