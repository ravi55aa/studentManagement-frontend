import { TeacherRoute,AuthRouter } from '@/constants/routes.contants';
import { Teachers } from '@/types/types';

import { IGetAllTeachers, ITeacher, ITeacherBio } from '@/interfaces/ITeacher';
import { LoginPayloadType } from '@/types/loginType';
import { TPaginationQuery ,TPaginationResult} from '@/types/paginationTypes';
import { BaseService } from './Base.Service';

export class TeacherService extends BaseService {

  static login(formData: LoginPayloadType) {
    return this.post<LoginPayloadType, Partial<ITeacherBio>>(
      AuthRouter.login,
      formData
    );
  }

  static verifyTeacher(email: string) {
    return this.get<{ id: string }>(
      `${TeacherRoute.verifyTeacher}/${email}`
    );
  }

  static addBio(formData: FormData) {
    return this.post<FormData, Partial<ITeacherBio>>(
      TeacherRoute.addBio,
      formData
    );
  }

  static addProfessional(teacherId: string, formData: Partial<ITeacher>) {
    return this.post<Partial<ITeacher>, Partial<ITeacher>>(
      `${TeacherRoute.addProfessional}/${teacherId}`,
      formData
    );
  }

  static getById(id: string) {
    return this.get<Teachers>(
      `/teacher/${id}`
    );
  }

  static getAll(paginationQuery: TPaginationQuery) {
    return this.get<TPaginationResult<IGetAllTeachers>>(
      TeacherRoute.getAll,
      paginationQuery
    );
  }

  static getAllWithQuery(paginationQuery: TPaginationQuery,query:Record<string,number|string>) {
    return this.get<TPaginationResult<IGetAllTeachers>>(
      TeacherRoute.getAll,
      {...query,...paginationQuery}
    );
  }

  static editBio(id: string, formData: FormData) {
    return this.patch<FormData, unknown>(
      `${TeacherRoute.updateBio}/${id}`,
      formData
    );
  }

  static editProfessional(id: string, formData: Partial<ITeacher>) {
    return this.patch<Partial<ITeacher>, unknown>(
      `${TeacherRoute.updateProfessional}/${id}`,
      formData
    );
  }

  static getAllUnAssigned(center: string, paginationQuery: TPaginationQuery) {
    return this.get<TPaginationResult<ITeacherBio>>(
      TeacherRoute.getAllUnAssigned,
      { center, ...paginationQuery }
    );
  }
}
