import { handleApi,HandleApiOptions } from '@/api/global.api';
import { Roles } from '@/constants/role.enum';
import { HomeworkRoute, StudentHomeworkRoute, SubjectRoute } from '@/constants/routes.contants';
import { IHomework } from '@/interfaces/IHomework';


export class StudentHomeworkService {
    static async submit(formData: FormData,homeworkId:string) {
        const config: HandleApiOptions<FormData> = {
        method: 'post',
        endPoint: `${StudentHomeworkRoute.submit}/${homeworkId}`,
        payload: formData,
        headers: { role: Roles.Student },
        };

        return await handleApi<FormData, IHomework>(config);
    }

    static async getAll(role:string='Teacher') {
        const config: HandleApiOptions<null> = {
        method: 'get',
        endPoint: StudentHomeworkRoute.add,
        payload: null,
        headers: { role: role },
        };

        return await handleApi<null, IHomework[]>(config);
    }

    static async getAllWithQuery(role:string='Teacher',query:Record<string,string|number|boolean>={}) {
        const config: HandleApiOptions<null> = {
        method: 'get',
        endPoint: StudentHomeworkRoute.add,
        payload: null,
        params:query,
        headers: { role: role },
        };

        return await handleApi<null, IHomework[]>(config);
    }

    static async get(role:string='Teacher',id: string) {
        const config: HandleApiOptions<null> = {
        method: 'get',
        endPoint: `${StudentHomeworkRoute.add}/${id}`,
        payload: null,
        headers: { role: role },
        };

        return await handleApi<null, IHomework>(config);
    }

    static async delete(role:string='Teacher',id: string) {
        const config: HandleApiOptions<null> = {
        method: 'delete',
        endPoint: `${SubjectRoute.get}/${id}`,
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
