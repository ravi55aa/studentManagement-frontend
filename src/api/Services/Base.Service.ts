import { HandleApiOptions,handleApi } from "../global.api";

export class BaseService {
    protected static async request<TPayload, TResponse>({
        method,
        endPoint,
        payload,
        params
    }: {
        method: 'get' | 'post' | 'put' | 'patch' | 'delete';
        endPoint: string;
        payload?: TPayload;
        params?: Record<string, any>; 
    }) {
        const config: HandleApiOptions<TPayload> = {
        method,
        endPoint,
        payload: payload ?? null,
        params
        };

        return await handleApi<TPayload, TResponse>(config);
    }

    protected static get<TResponse>(endPoint: string,params?:Record<string,any>) {
        return this.request<null, TResponse>({
        method: 'get',
        endPoint,
        params:params||null
        });
    }

    protected static post<TPayload, TResponse>(
        endPoint: string,
        payload: TPayload,
        params?:Record<string,any>
    ) {
        return this.request<TPayload, TResponse>({
        method: 'post',
        endPoint,
        payload,
        params:params||null
        });
    }

    protected static put<TPayload, TResponse>(
        endPoint: string,
        payload: TPayload,
        params?:Record<string,any>
    ) {
        return this.request<TPayload, TResponse>({
        method: 'put',
        endPoint,
        payload,
        params:params||null
        });
    }

    protected static patch<TPayload, TResponse>(
        endPoint: string,
        payload: TPayload,
        params?:Record<string,any>
    ) {
        return this.request<TPayload, TResponse>({
        method: 'patch',
        endPoint,
        payload,
        params:params||null
        });
    }

    protected static delete<TResponse>(
        endPoint: string,
        params?:Record<string,any>
    ) {
        return this.request<null, TResponse>({
        method: 'delete',
        endPoint,
        params:params||null
        });
    }
}