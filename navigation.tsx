import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { LoginScreen } from "./src/screens";
import { FormWrapper } from "./src/core/components/form";
import { useForm } from "react-hook-form";
import { Text } from "native-base";

const LinkingConfiguration: LinkingOptions<RootStackParamList> = {
    prefixes: [Linking.makeUrl("/")],
    config: {
        screens: {
            Login: "*",
        },
    },
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

export function Navigation() {
    return (
        <NavigationContainer linking={LinkingConfiguration}>
            <RootNavigator />
        </NavigationContainer>
    );
}
