import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { Text } from "react-native";

interface FormErrorMessageProps {}

const FormErrorMessage: FC<FormErrorMessageProps> = () => {
    const {
        formState: { errors },
    } = useFormContext();

    return (
        <>
            {Boolean(errors.errorMessage?.message) && (
                <Text>{errors.errorMessage.message}</Text>
            )}
        </>
    );
};

export default FormErrorMessage;
