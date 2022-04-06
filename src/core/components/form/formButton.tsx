import { Button, Text } from "native-base";
import * as React from "react";
import { GestureResponderEvent } from "react-native";
interface FormButtonProps {
    label: string;
    onPress: (event: GestureResponderEvent) => void;
}

const FormButton: React.FC<FormButtonProps> = ({ label, onPress }) => {
    return (
        <Button bg={"green.500"} onPress={onPress}>
            <Text
                px={4}
                py={2}
                color={"white"}
                fontSize="sm"
                fontWeight="bold"
                textAlign="center"
            >
                {label}
            </Text>
        </Button>
    );
};

export default FormButton;
