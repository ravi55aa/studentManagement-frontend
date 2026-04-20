import { SubjectRoute } from '@/constants/routes.contants';
import { HandleApiOptions, handleApi } from '../global.api';
import { IAcademicSubject } from '@/interfaces/ISchool';
import { BaseService } from './Base.Service';

export class SubjectService extends BaseService {

  static create(formData: FormData) {
    return this.post<FormData, IAcademicSubject>(
      SubjectRoute.add,
      formData
    );
  }

  static getAll() {
    return this.get<IAcademicSubject[]>(
      SubjectRoute.get
    );
  }

  static getAllWithQuery(
    query: Record<string, string | number | boolean> = {}
  ) {
    return this.get<IAcademicSubject[]>(
      SubjectRoute.get,
      query
    );
  }

  static getById(id: string) {
    return this.get<IAcademicSubject>(
      `${SubjectRoute.get}/${id}`
    );
  }

  static deleteSubject(id: string) {
    return this.delete<{ message: string }>(
      `${SubjectRoute.get}/${id}`
    );
  }

  static update(id: string, formData: FormData) {
    return this.post<FormData, IAcademicSubject>(
      `${SubjectRoute.edit}/v1/${id}`,
      formData
    );
  }
}
