import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ApiState {
    isLoading: boolean;
    errorDetails: Record<string, string>;
    isError: boolean;
    message: string;
    errorMessage: string;
}

const initialState: ApiState = {
    isLoading: false,
    errorDetails: {},
    isError: false,
    message: "",
    errorMessage: "",
};

const slice = createSlice({
    name: "api",
    initialState,
    reducers: {
        initReq: (state) => ({ ...state, isLoading: true, isError: false }),
        setLoading: (
            state,
            { payload }: PayloadAction<{ isLoading: boolean }>
        ) => ({
            ...state,
            isLoading: payload.isLoading,
        }),
        resetState: () => ({ ...initialState }),
        updateErrorDetails: (
            state,
            { payload }: PayloadAction<Record<string, string>>
        ) => {
            const newState = { ...state };
            if (payload?.errorMessage)
                newState.errorMessage = payload.errorMessage;

            newState.errorDetails = payload;
            newState.isError = true;
            return newState;
        },
        updateSuccessMessage: (
            state,
            { payload }: PayloadAction<Record<string, string>>
        ) => ({ ...state, message: payload.message || "" }),
    },
    extraReducers: (builder) => {},
});

export const apiActions = {
    ...slice.actions,
};
export const apiReducer = slice.reducer;
