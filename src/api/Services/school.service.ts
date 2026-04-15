import { SchoolRoute } from '@/constants/routes.contants';
import { HandleApiOptions, handleApi } from '../global.api';
import { ISchoolFormData } from '@/interfaces/IRegister';
import { ISubjectReducer } from '@/utils/Redux/Reducer/school.reducer';
import { Roles } from '@/constants/role.enum';
import { BaseService } from './Base.Service';
import { schoolStatus } from '@/types/types';

export class SchoolService extends BaseService {
  static async register(formData: ISchoolFormData) {
    const config: HandleApiOptions<ISchoolFormData> = {
      method: 'post',
      endPoint: SchoolRoute.register, // avoid hardcoding
      payload: formData,
      headers: { role: 'Admin' },
    };

    return await handleApi<ISchoolFormData, ISchoolFormData>(config);
  }

  static async updateMeta(id: string, formData: object) {
    const config: HandleApiOptions<object> = {
      method: 'patch',
      endPoint: `${SchoolRoute.updateMeta}/${id}`,
      payload: formData,
      headers: { role: 'School' },
    };

    return await handleApi<object, null>(config);
  }

  static async view() {
    return this.get<ISubjectReducer>(SchoolRoute.viewSchool)
  }

  static async resetPassword(role:string=Roles.School,userId: string, data: object) {
    const config: HandleApiOptions<object> = {
      method: 'patch',
      endPoint: `${SchoolRoute.resetPassword}/${userId}`,
      payload: data,
      headers: { role: role },
    };

    return await handleApi<object, null>(config);
  }

  static async deleteSchool(id: string) {
    const config: HandleApiOptions<object> = {
      method: 'delete',
      endPoint: `${SchoolRoute.delete}/${id}`,
      payload: null,
      headers: { role: 'School' },
    };

    return await handleApi<object, null>(config);
  }

  // static async getAllSchool(){
  //   return this.get<ISchoolFormData[]>(SchoolRoute.getall);
  // }

  static async getAllSchool() {
    const config: HandleApiOptions<ISchoolFormData> = {
      method: 'get',
      endPoint: SchoolRoute.getall,
      payload: null,
      headers: { role: 'Admin' },
    };

    return await handleApi<ISchoolFormData, ISchoolFormData>(config);
  }

  static async getById(id:string) {
    return this.get<ISubjectReducer>(`${SchoolRoute.get}/${id}`)
  }

  static async updateStatus(id:string, status:schoolStatus) {
    return this.patch<Partial<ISchoolFormData>,null>(`${SchoolRoute.updateMeta}/${id}`,{status});
  }
}