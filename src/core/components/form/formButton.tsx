import { Button, IButtonProps, Text } from "native-base";
import * as React from "react";
import { GestureResponderEvent } from "react-native";
type FormButtonProps = {
    label: string;
    onPress: (event: GestureResponderEvent) => void;
};

type FormButtonPropsExtends = FormButtonProps & IButtonProps;

const FormButton: React.FC<FormButtonPropsExtends> = ({
    label,
    onPress,
    ...rest
}) => {
    return (
        <Button
            bg="primary.500"
            borderRadius={100}
            onPress={onPress}
            _pressed={{ bg: "primary.500" }}
            {...rest}
        >
            <Text
                px={4}
                py={2}
                color="white"
                fontSize="md"
                fontWeight="bold"
                textAlign="center"
            >
                {label}
            </Text>
        </Button>
    );
};

export default FormButton;
