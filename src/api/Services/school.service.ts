import { SchoolRoute } from '@/constants/routes.contants';
import { ISchoolFormData } from '@/interfaces/IRegister';
import { ISubjectReducer } from '@/utils/Redux/Reducer/school.reducer';
import { BaseService } from './Base.Service';
import { schoolStatus } from '@/types/types';

export class SchoolService extends BaseService {

  static register(formData: ISchoolFormData) {
    return this.post<ISchoolFormData, ISchoolFormData>(
      SchoolRoute.register,
      formData
    );
  }

  static updateMeta(id: string, formData: object) {
    return this.patch<object, null>(
      `${SchoolRoute.updateMeta}/${id}`,
      formData
    );
  }

  static view() {
    return this.get<ISubjectReducer>(
      SchoolRoute.viewSchool
    );
  }

  static resetPassword(userId: string, data: object) {
    return this.patch<object, null>(
      `${SchoolRoute.resetPassword}/${userId}`,
      data
    );
  }

  static deleteSchool(id: string) {
    return this.delete<null>(
      `${SchoolRoute.delete}/${id}`
    );
  }

  static getAllSchool() {
    return this.get<ISchoolFormData[]>(
      SchoolRoute.getall
    );
  }

  static getById(id: string) {
    return this.get<ISubjectReducer>(
      `${SchoolRoute.get}/${id}`
    );
  }

  static updateStatus(id: string, status: schoolStatus) {
    return this.patch<Partial<ISchoolFormData>, null>(
      `${SchoolRoute.updateMeta}/${id}`,
      { status }
    );
  }
}