import { AxiosRequestConfig, AxiosError } 
    from "axios";
import { axiosBaseURL } 
    from "@/config/axios.config";
import { IResponse } from "@/interfaces/IResponse";

type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

export interface HandleApiOptions<T> {
    method: HttpMethod;
    endPoint: string;
    payload?: T;
    headers?: Record<string, string>;
    params?: Record<string, string | number | boolean | undefined>;
}




export const handleApi = async <TRequest = unknown, TResponse = IResponse>(
    options: HandleApiOptions<TRequest>
    ): Promise<{
    success: boolean;
    data?: TResponse;
    error?: string;
    }> => {



    try {
        const config: AxiosRequestConfig = {
        url: options.endPoint,
        method: options.method,
        data: options.payload,
        params: options.params,
        headers: options.headers,
        };

        const response = await axiosBaseURL(config);


        return {
        success: true,
        data: response.data as TResponse,
        };



    } catch (err) {
        const error = err as AxiosError;

        console.error(
        "API Error:",
        error.response?.data || error.message
        );

        return {
        success: false,
        error:  error.message,
        };
    }
};
