import { BatchRoute } from '@/constants/routes.contants';
import { HandleApiOptions, handleApi } from '../global.api';
import { IBatches } from '@/interfaces/ISchool';

export class BatchService {
  static async create(form: Partial<IBatches>) {
    const config: HandleApiOptions<Partial<IBatches>> = {
      method: 'post',
      endPoint: BatchRoute.add,
      payload: form,
      headers: { role: 'School' },
    };

    return await handleApi<Partial<IBatches>, IBatches>(config);
  }

  static async getAll(role:string='School') {
    const config: HandleApiOptions<null> = {
      method: 'get',
      endPoint: BatchRoute.get,
      payload: null,
      headers: { role: role },
    };

    return await handleApi<null, IBatches>(config);
  }

  static async getAllWithQuery(role:string='School',query:Record<string,string|number|boolean>={}) {
    const config: HandleApiOptions<null> = {
      method: 'get',
      endPoint: BatchRoute.get,
      payload: null,
      params:query,
      headers: { role: role },
    };

    return await handleApi<null, IBatches[]>(config);
  }

  static async get(role:string='School',id:string) {
    const config: HandleApiOptions<null> = {
      method: 'get',
      endPoint: `${BatchRoute.get}/${id}`,
      payload: null,
      headers: { role: role },
    };

    return await handleApi<null, IBatches>(config);
  }

  static async assignTeacher(role:string='School',batchId: string, teacherId: string) {
    const config: HandleApiOptions<{ teacherId: string }> = {
      method: 'patch',
      endPoint: `${BatchRoute.assignTeacher}/${batchId}`,
      payload: { teacherId },
      headers: { role: role },
    };

    return await handleApi<{ teacherId: string }, IBatches>(config);
  }

  static async update(role:string='School',id: string, form: object) {
    const config: HandleApiOptions<object> = {
      method: 'put',
      endPoint: `${BatchRoute.edit}/${id}`,
      payload: form,
      headers: { role: role },
    };

    return await handleApi<object, IBatches>(config);
  }

}
