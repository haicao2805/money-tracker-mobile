import { Box } from "native-base";
import React, { FC } from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { useStoreApi } from "../../store";

interface FormWrapperProps {
    methods: UseFormReturn<any, any>;
}

export const FormWrapper: FC<FormWrapperProps> = ({ methods, children }) => {
    const apiState = useStoreApi();

    React.useEffect(() => {
        Object.keys(apiState.errorDetails).map((item) =>
            methods.setError(item, { message: apiState.errorDetails[item] })
        );

        if (apiState.errorMessage)
            methods.setError("errorMessage", {
                message: apiState.errorMessage,
            });
        if (apiState.message)
            methods.setError("message", { message: apiState.message });
    }, [apiState, methods]);

    return <FormProvider {...methods}>{children}</FormProvider>;
};
