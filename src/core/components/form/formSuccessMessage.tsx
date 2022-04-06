import * as React from "react";
import { useFormContext } from "react-hook-form";
import { Text } from "react-native";

interface FormSuccessMessageProps {}

export const FormSuccessMessage: React.FC<FormSuccessMessageProps> = () => {
    const {
        formState: { errors },
    } = useFormContext();

    return (
        <>
            {Boolean(errors.message?.message) && (
                <Text>{errors.message.message}</Text>
            )}
        </>
    );
};
