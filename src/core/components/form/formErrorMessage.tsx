import { Text } from "native-base";
import { FC } from "react";
import { useFormContext } from "react-hook-form";

interface FormErrorMessageProps {}

const FormErrorMessage: FC<FormErrorMessageProps> = () => {
    const {
        formState: { errors },
    } = useFormContext();

    return (
        <>
            {Boolean(errors.errorMessage?.message) && (
                <Text color="red.500">{errors.errorMessage.message}</Text>
            )}
        </>
    );
};

export default FormErrorMessage;
