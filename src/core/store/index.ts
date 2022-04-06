import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { apiReducer, ApiState } from "./apiStore";
import { userReducer, UserState } from "./userStore";
import { useSelector } from "react-redux";

export interface RootState {
    api: ApiState;
    // user: UserState;
}

const reducers = combineReducers<RootState>({
    api: apiReducer,
    // user: userReducer,
});

export const store = configureStore({
    reducer: reducers,
});

export const useStoreApi = () =>
    useSelector<RootState, ApiState>((state) => state.api);
// export const useStoreUser = () =>
//     useSelector<RootState, UserState>((state) => state.user);
