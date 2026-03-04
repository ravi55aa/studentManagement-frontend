import { SubjectRoute } from '@/constants/routes.contants';
import { HandleApiOptions, handleApi } from '../global.api';
import { IAcademicSubject } from '@/interfaces/ISchool';

export class SubjectService {
  static async create(formData: FormData) {
    const config: HandleApiOptions<FormData> = {
      method: 'post',
      endPoint: SubjectRoute.add,
      payload: formData,
      headers: { role: 'School' },
    };

    return await handleApi<FormData, IAcademicSubject>(config);
  }

  static async getAll() {
    const config: HandleApiOptions<null> = {
      method: 'get',
      endPoint: SubjectRoute.get,
      payload: null,
      headers: { role: 'School' },
    };

    return await handleApi<null, IAcademicSubject[]>(config);
  }

  static async get(id: string) {
    const config: HandleApiOptions<null> = {
      method: 'get',
      endPoint: `${SubjectRoute.get}/${id}`,
      payload: null,
      headers: { role: 'School' },
    };

    return await handleApi<null, IAcademicSubject>(config);
  }

  static async delete(id: string) {
    const config: HandleApiOptions<null> = {
      method: 'delete',
      endPoint: `${SubjectRoute.get}/${id}`,
      payload: null,
      headers: { role: 'School' },
    };

    return await handleApi<null, { message: string }>(config);
  }

  static async update(id: string, formData: FormData) {
    const config: HandleApiOptions<FormData> = {
      method: 'post', // (better use PATCH if backend supports it)
      endPoint: `${SubjectRoute.edit}/v1/${id}`,
      payload: formData,
      headers: { role: 'School' },
    };

    return await handleApi<FormData, IAcademicSubject>(config);
  }
}
