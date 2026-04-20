
import { HomeworkRoute, SubjectRoute } from '@/constants/routes.contants';
import { IHomework } from '@/interfaces/IHomework';
import { TPaginationQuery,TPaginationResult } from '@/types/paginationTypes';
import { BaseService } from '../Base.Service';


export class HomeworkService extends BaseService {

  static create(formData: FormData) {
    return this.post<FormData, IHomework>(
      HomeworkRoute.add,
      formData
    );
  }

  static getAll() {
    return this.get<IHomework[]>(
      HomeworkRoute.get
    );
  }

  static getAllWithQuery(
    paginationQuery: TPaginationQuery,
    query: Record<string, string | number | boolean> = {}
  ) {
    return this.get<TPaginationResult<IHomework>>(
      HomeworkRoute.getall,
      { ...paginationQuery, ...query }
    );
  }

  static getById(id: string) {
    return this.get<IHomework>(
      `${HomeworkRoute.get}/${id}`
    );
  }

  static deleteHomework(id: string) {
    return this.delete<{ message: string }>(
      `${HomeworkRoute.delete}/${id}`
    );
  }

  static update(id: string, formData: FormData) {
    return this.patch<FormData, IHomework>(
      `${HomeworkRoute.edit}/${id}`,
      formData
    );
  }
}
