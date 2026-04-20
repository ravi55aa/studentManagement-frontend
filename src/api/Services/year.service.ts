import { YearRoute } from '@/constants/routes.contants';
import { HandleApiOptions, handleApi } from '../global.api';
import { IAcademicYear } from '@/interfaces/ISchool';
import { TPaginationQuery, TPaginationResult } from '@/types/paginationTypes';

export class AcademicYearService {
  static async add(formData: object) {
    const config: HandleApiOptions<object> = {
      method: 'post',
      endPoint: YearRoute.add,
      headers: { 'Content-type': 'application/json' },
      payload: formData,
    };

    return await handleApi(config);
  }

  static async get(id: string) {
    const config: HandleApiOptions<null> = {
      endPoint: `${YearRoute.get}/${id}`,
      method: 'get',
      headers: { role: 'School' },
    };
    return await handleApi<null, IAcademicYear>(config);
  }

  static async getAll(paginationQuery:TPaginationQuery) {
    const config: HandleApiOptions<null> = {
      method: 'get',
      endPoint: YearRoute.get,
      payload: null,
      params: paginationQuery,
    };

    return await handleApi<null, TPaginationResult<IAcademicYear>>(config);
  }

  static async edit(id: string, formData: object) {
    const config: HandleApiOptions<object> = {
      endPoint: `${YearRoute.edit}/${id}`,
      method: 'put',
      payload: formData,
      headers: { role: 'school' },
    };
    return await handleApi<object, null>(config);
  }

  static async delete(id: string) {
    const config: HandleApiOptions<null> = {
      method: 'delete',
      endPoint: `${YearRoute.get}/${id}`,
      payload: null,
      headers: { role: 'School' },
    };

    return await handleApi<null, null>(config);
  }
}
