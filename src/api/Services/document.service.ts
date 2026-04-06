import { DocumentRoute } from '@/constants/routes.contants';
import { HandleApiOptions, handleApi } from '../global.api';
import { IDocument } from '@/interfaces/IRegister';
import { Roles } from '@/constants/role.enum';

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

  static async get(role:string=Roles.School,id: string) {
    const config: HandleApiOptions<null> = {
      method: 'get',
      endPoint: `${DocumentRoute.document}/${id}`,
      payload: null,
      headers: { role: role },
    };

    return await handleApi<null, IDocument>(config);
  }

  static async create(role:string=Roles.School,userId: string, formData: FormData) {
    const config: HandleApiOptions<FormData> = {
      method: 'put',
      endPoint: `${DocumentRoute.document}/${userId}`,
      payload: formData,
      headers: { role: role },
    };

    return await handleApi<FormData, IDocument>(config);
  }

  static async update(role:string=Roles.School,userId: string, formData: Partial<IDocument>) {
      const config: HandleApiOptions<Partial<IDocument>> = {
            method: 'put',
            endPoint: `${DocumentRoute.document}/${userId}`,
            payload: formData,
            headers: { role: role },
        };

      return await handleApi<Partial<IDocument>, IDocument>(config);
  }

  static async delete(id: string, fileName: string) {
    const config: HandleApiOptions<null> = {
      method: 'delete',
      endPoint: `${DocumentRoute.document}/${id}`,
      payload: null,
      params: { file_Name: fileName },
      headers: { role: 'School' },
    };

    return await handleApi<null, null>(config);
  }
}
