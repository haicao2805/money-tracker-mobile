import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { LoginScreen, RegisterScreen, AuthScreen } from "./src/screens";

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
                name="Auth"
                component={AuthScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ title: "" }}
            />
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ title: "" }}
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
