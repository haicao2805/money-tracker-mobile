import React from "react";
import { NativeBaseProvider, StatusBar } from "native-base";
import { Provider } from "react-redux";
import { store } from "./src/core/store";
import { Navigation } from "./navigation";

const App = () => {
    return (
        <Provider store={store}>
            <NativeBaseProvider>
                <StatusBar />

                <Navigation />
            </NativeBaseProvider>
        </Provider>
    );
};

export default App;
