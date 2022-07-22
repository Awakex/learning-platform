import axios from "axios";
import { REQUEST_CONFIG } from "./Config";
import { useAppSelector } from "../hooks/redux";
import { toast } from "react-toastify";

export const Request = (() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const instance = axios.create({
        baseURL: REQUEST_CONFIG.URL,
        timeout: REQUEST_CONFIG.TIMEOUT,
        cancelToken: source.token,
    });

    instance.interceptors.request.use(
        (config) => {
            if (!config.headers) {
                console.log("[AUTH] Headers is empty");
                return;
            }

            let token = localStorage.getItem("token");

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            } else {
                toast.error("Запрос без авторизации");
            }

            config.headers.Accept = "application/json";
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    instance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            toast.error(error);
            return Promise.reject(error);
        }
    );

    Object.defineProperty(instance, "cancel", {
        value: source.cancel,
    });

    return instance;
})();
