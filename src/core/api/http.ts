import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError } from "axios";
import { config } from "../config";
import { store } from "../store";
import { apiActions } from "../store/apiStore";

const http = axios.create({
    baseURL: config.SERVER_URL,
    withCredentials: true,
});

http.interceptors.request.use(async function (req) {
    store.dispatch(apiActions.initReq());
    const token = await AsyncStorage.getItem("@token");

    if (token && req.headers) req.headers["authorization"] = `Bearer ${token}`;
    return req;
});

http.interceptors.response.use(
    function (res) {
        store.dispatch(apiActions.resetState());

        if (res?.data?.message)
            store.dispatch(apiActions.updateSuccessMessage(res.data));

        return res;
    },
    function (error: AxiosError) {
        store.dispatch(apiActions.resetState());

        if (error.response?.status)
            store.dispatch(apiActions.updateErrorDetails(error.response.data));

        return Promise.reject(error.response);
    }
);
export { http };
