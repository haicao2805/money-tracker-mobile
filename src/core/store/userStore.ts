import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User, UserRole, UserStatus } from "../models/user";
import { http } from "../api/http";

export interface UserState extends User {
    isLogin: boolean;
}

const initialState: UserState = {
    email: "",
    isVerified: false,
    name: "",
    id: "",
    createDate: "",
    updateDate: "",
    googleId: "",
    password: "",
    role: UserRole.ADMIN,
    status: UserStatus.ACTIVE,
    isLogin: false,
};

const slice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetState: () => ({ ...initialState }),
        updateLogin: (state) => ({ ...state, isLogin: true }),
    },
    extraReducers: (builder) => {},
});

export const userThunk = {
    getCurrentUser: createAsyncThunk<User, void>(
        "getCurrentUser",
        async (_, { rejectWithValue }) => {
            try {
                const res = await http.get<User>("/user/me");
                return res.data;
            } catch (error) {
                return rejectWithValue(null);
            }
        }
    ),
};

export const userActions = {
    ...slice.actions,
};

export const userReducer = slice.reducer;
