import React from "react";
import { NativeBaseProvider, StatusBar } from "native-base";
import { Provider } from "react-redux";
import { store } from "./src/core/store";
import { Navigation } from "./navigation";
import { customTheme } from "./native-base.config";

const App = () => {
    return (
        <Provider store={store}>
            <NativeBaseProvider theme={customTheme}>
                <StatusBar />

                <Navigation />
            </NativeBaseProvider>
        </Provider>
    );
};

export default App;
