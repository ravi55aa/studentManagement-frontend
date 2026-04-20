import { YearRoute } from '@/constants/routes.contants';
import { IAcademicYear } from '@/interfaces/ISchool';
import { TPaginationQuery, TPaginationResult } from '@/types/paginationTypes';
import { BaseService } from './Base.Service';

export class AcademicYearService extends BaseService {

  static add(formData: object) {
    return this.post<object, unknown>(
      YearRoute.add,
      formData
    );
  }

  static getById(id: string) {
    return this.get<IAcademicYear>(
      `${YearRoute.get}/${id}`
    );
  }

  static getAll(paginationQuery: TPaginationQuery) {
    return this.get<TPaginationResult<IAcademicYear>>(
      YearRoute.get,
      paginationQuery
    );
  }

  static edit(id: string, formData: object) {
    return this.put<object, null>(
      `${YearRoute.edit}/${id}`,
      formData
    );
  }

  static deleteAcademicYear(id: string) {
    return this.delete<null>(
      `${YearRoute.get}/${id}`
    );
  }
}