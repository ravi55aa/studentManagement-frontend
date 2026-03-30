import { handleApi,HandleApiOptions } from '@/api/global.api';
import { Roles } from '@/constants/role.enum';
import { HomeworkRoute, StudentHomeworkRoute, SubjectRoute } from '@/constants/routes.contants';
import { IHomework, IHomeworkSubmission } from '@/interfaces/IHomework';


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
        endPoint: StudentHomeworkRoute.getall,
        payload: null,
        headers: { role: role },
        };

        return await handleApi<null, IHomework[]>(config);
    }

    static async getAllWithQuery(role:string=Roles.Student,query:Record<string,string|number|boolean>={}) {
        const config: HandleApiOptions<null> = {
        method: 'get',
        endPoint: StudentHomeworkRoute.getall,
        payload: null,
        params:query,
        headers: { role: role },
        };

        return await handleApi<null, IHomework[]>(config);
    }
    
    static async getAllSubmissions(role:string=Roles.Student,query:Record<string,string|number|boolean>={}) {
        const config: HandleApiOptions<null> = {
        method: 'get',
        endPoint: StudentHomeworkRoute.getall,
        payload: null,
        params:query,
        headers: { role: role },
        };

        return await handleApi<null, IHomeworkSubmission[]>(config);
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

    static async update(role:string=Roles.Teacher,id: string, formData: IHomeworkSubmission) {
        const config: HandleApiOptions<IHomeworkSubmission> = {
        method: 'put', // (better use PATCH if backend supports it)
        endPoint: `${StudentHomeworkRoute.update}/${id}`,
        payload: formData,
        headers: { role: role },
        };

        return await handleApi<IHomeworkSubmission, IHomeworkSubmission>(config);
    }

    static async updateMany(role:string=Roles.Student,homeworkId: string, formData: IHomeworkSubmission[]) {
        const config: HandleApiOptions<IHomeworkSubmission[]> = {
        method: 'put', // (better use PATCH if backend supports it)
        endPoint: `${StudentHomeworkService.updateMany}/${homeworkId}`,
        payload: formData,
        headers: { role: role },
        };

        return await handleApi<IHomeworkSubmission[], IHomeworkSubmission[]>(config);
    }
}
