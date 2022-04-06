import { Button, Text } from "native-base";
import * as React from "react";
import { GestureResponderEvent } from "react-native";
interface FormButtonProps {
    label: string;
    onPress: (event: GestureResponderEvent) => void;
}

const FormButton: React.FC<FormButtonProps> = ({ label, onPress }) => {
    return (
        <Button
            bg="primary.500"
            borderRadius={100}
            onPress={onPress}
            _pressed={{ bg: "primary.500" }}
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
