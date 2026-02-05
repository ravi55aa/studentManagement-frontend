

import { AxiosRequestConfig, AxiosError } 
    from "axios";
import { axiosBaseURL } 
    from "@/config/axios.config";
import { IResponse } 
    from "@/interfaces/IResponse";

type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

export interface HandleApiOptions<TRequest> {
    method: HttpMethod;
    endPoint: string;
    payload?: TRequest;
    headers?: Record<string, string>;
    params?: Record<string, string | number | boolean | undefined>;
}

export const handleApi = async <TRequest = unknown, TData = unknown>(
    options: HandleApiOptions<TRequest>
    ): Promise<{
    success: boolean;
    data?: IResponse<TData>;
    error?: {
        message?: string;
        field?: string;
        code?: number;
    };

    }> => {

    try {

        const config: AxiosRequestConfig = {
        url: options.endPoint,
        method: options.method,
        data: options.payload,
        params: options.params,
        headers: options.headers,
        };

        const response = await axiosBaseURL<IResponse<TData>>(config);

        return {
            success: true,
            data: response.data,
        };
        
    } catch (err) {
        const error = err as AxiosError;
        const res=error.response.data;

        return {
            success: false,
            error:res,
        };
    }
};
