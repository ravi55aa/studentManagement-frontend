import { handleApi,HandleApiOptions } from '@/api/global.api';
import { HomeworkRoute, SubjectRoute } from '@/constants/routes.contants';
import { IHomework } from '@/interfaces/IHomework';


export class HomeworkService {
    static async create(formData: FormData) {
        const config: HandleApiOptions<FormData> = {
        method: 'post',
        endPoint: HomeworkRoute.add,
        payload: formData,
        headers: { role: 'Teacher' },
        };

        return await handleApi<FormData, IHomework>(config);
    }

    static async getAll(role:string='Teacher') {
        const config: HandleApiOptions<null> = {
        method: 'get',
        endPoint: HomeworkRoute.get,
        payload: null,
        headers: { role: role },
        };

        return await handleApi<null, IHomework[]>(config);
    }

    static async getAllWithQuery(role:string='Teacher',query:Record<string,string|number|boolean>={}) {
        const config: HandleApiOptions<null> = {
        method: 'get',
        endPoint: HomeworkRoute.getall,
        payload: null,
        params:query,
        headers: { role: role },
        };

        return await handleApi<null, IHomework[]>(config);
    }

    static async get(role:string='Teacher',id: string) {
        const config: HandleApiOptions<null> = {
        method: 'get',
        endPoint: `${HomeworkRoute.get}/${id}`,
        payload: null,
        headers: { role: role },
        };

        return await handleApi<null, IHomework>(config);
    }

    static async delete(role:string='Teacher',id: string) {
        const config: HandleApiOptions<null> = {
        method: 'delete',
        endPoint: `${HomeworkRoute.delete}/${id}`,
        payload: null,
        headers: { role: role },
        };

        return await handleApi<null, { message: string }>(config);
    }

    static async update(id: string, formData: FormData) {
        const config: HandleApiOptions<FormData> = {
        method: 'post', // (better use PATCH if backend supports it)
        endPoint: `${SubjectRoute.edit}/v1/${id}`,
        payload: formData,
        headers: { role: 'Teacher' },
        };

        return await handleApi<FormData, IHomework>(config);
    }
}
