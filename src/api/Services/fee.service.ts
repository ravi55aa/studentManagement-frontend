import { FeeRoute } from '@/constants/routes.contants';
import { HandleApiOptions, handleApi } from '../global.api';
import { IFee } from '@/interfaces/IFee';

export class FeeService {
    static async create(form: object) {
        const config: HandleApiOptions<object> = {
        method: 'post',
        endPoint: FeeRoute.add,
        payload: form,
        headers: { role: 'School' },
        };

        return await handleApi<object, IFee>(config);
    }

    static async get(id: string) {
        const config: HandleApiOptions<null> = {
        method: 'get',
        endPoint: `${FeeRoute.get}/${id}`,
        payload: null,
        headers: { role: 'School' },
        };

        return await handleApi<null, Partial<IFee>>(config);
    }

    static async getAll() {
        const config: HandleApiOptions<null> = {
        method: 'get',
        endPoint: FeeRoute.getAll,
        payload: null,
        headers: { role: 'School' },
        };

        return await handleApi<null, IFee[]>(config);
    }

    static async update(id: string, form: object) {
        const config: HandleApiOptions<object> = {
        method: 'patch',
        endPoint: `${FeeRoute.edit}/${id}`,
        payload: form,
        headers: { role: 'School' },
        };

        return await handleApi<object, IFee>(config);
    }

    static async delete(id: string) {
        const config: HandleApiOptions<null> = {
        method: 'delete',
        endPoint: `${FeeRoute.delete}/${id}`,
        payload: null,
        headers: { role: 'School' },
        };

        return await handleApi<null, { message: string }>(config);
    }
}
