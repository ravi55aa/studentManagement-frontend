import { DocumentRoute } from '@/constants/routes.contants';
import { HandleApiOptions, handleApi } from '../global.api';
import { IDocument } from '@/interfaces/IRegister'; 

export class DocumentService {

    static async getAll() {
        const config: HandleApiOptions<null> = {
        method: 'get',
        endPoint: DocumentRoute.document,
        payload: null,
        headers: { role: 'School' },
        };

        return await handleApi<null, IDocument[]>(config);
    }

    static async get(id: string) {
        const config: HandleApiOptions<null> = {
        method: 'get',
        endPoint: `${DocumentRoute.document}/${id}`,
        payload: null,
        headers: { role: 'School' },
        };

        return await handleApi<null, IDocument>(config);
    }

    static async create(userId:string,formData: FormData) {
        const config:HandleApiOptions<FormData>={
            method:"put",
            endPoint:`${DocumentRoute.document}/${userId}`,
            payload:formData,
            headers:{role:"School"},
        }

        return await handleApi<FormData, IDocument>(config);
    }

    static async update(id: string, formData: FormData) {
        const config: HandleApiOptions<FormData> = {
        method: 'patch',
        endPoint: `${DocumentRoute.edit}${id}`,
        payload: formData,
        headers: { role: 'School' },
        };

        return await handleApi<FormData, IDocument>(config);
    }

    static async delete(id: string,fileName:string) {
        const config: HandleApiOptions<null> = {
        method: 'delete',
        endPoint: `${DocumentRoute.document}/${id}`,
        payload: null,
        params:{"file_Name":fileName},
        headers: { role: 'School' },
        };

        return await handleApi<null, null>(config);
    }
}
