import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
    RootStackParamList,
    RootTabParamList,
    RootTabScreenProps,
} from "./types";
import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import { Pressable } from "native-base";
import { AuthScreen, LoginScreen, RegisterScreen } from "./src/screens/auth";
import { TransactionScreen, ReportScreen } from "./src/screens/transaction";

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
            <Stack.Screen
                name="Root"
                component={BottomTabNavigator}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
    return (
        <BottomTab.Navigator initialRouteName="Transaction" screenOptions={{}}>
            <BottomTab.Screen
                name="Transaction"
                component={TransactionScreen}
                options={({
                    navigation,
                }: RootTabScreenProps<"Transaction">) => ({
                    title: "Tab One",
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="code" color={color} />
                    ),
                    headerRight: () => (
                        <Pressable
                            // onPress={() => navigation.navigate("")}
                            style={({ pressed }) => ({
                                opacity: pressed ? 0.5 : 1,
                            })}
                        >
                            <FontAwesome
                                name="info-circle"
                                size={25}
                                style={{ marginRight: 15 }}
                            />
                        </Pressable>
                    ),
                })}
            />
            <BottomTab.Screen
                name="Report"
                component={ReportScreen}
                options={{
                    title: "Tab Two",
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="code" color={color} />
                    ),
                }}
            />
        </BottomTab.Navigator>
    );
}

function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>["name"];
    color: string;
}) {
    return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

export function Navigation() {
    return (
        <NavigationContainer linking={LinkingConfiguration}>
            <RootNavigator />
        </NavigationContainer>
    );
}
