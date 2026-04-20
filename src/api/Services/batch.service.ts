import { BatchRoute } from '@/constants/routes.contants';
import { IBatches } from '@/interfaces/ISchool';
import { TPaginationQuery, TPaginationResult } from '@/types/paginationTypes';
import { BaseService } from './Base.Service';

export class BatchService extends BaseService {

  static create(form: Partial<IBatches>) {
    return this.post<Partial<IBatches>, IBatches>(
      BatchRoute.add,
      form
    );
  }

  static getAll(paginationQuery: TPaginationQuery) {
    return this.get<TPaginationResult<IBatches>>(
      BatchRoute.get,
      paginationQuery
    );
  }

  static getAllWithQuery(
    query: Record<string, string | number | boolean> = {},
    paginationQuery: TPaginationQuery
  ) {
    return this.get<TPaginationResult<IBatches>>(
      BatchRoute.get,
      { ...query, ...paginationQuery }
    );
  }

  static getById(id: string) {
    return this.get<IBatches>(
      `${BatchRoute.get}/${id}`
    );
  }

  static assignTeacher(batchId: string, teacherId: string) {
    return this.patch<{ teacherId: string }, IBatches>(
      `${BatchRoute.assignTeacher}/${batchId}`,
      { teacherId }
    );
  }

  static update(id: string, form: object) {
    return this.put<object, IBatches>(
      `${BatchRoute.edit}/${id}`,
      form
    );
  }
}
