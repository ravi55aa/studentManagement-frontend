import { TeacherRoute,AuthRouter } from '@/constants/routes.contants';
import { HandleApiOptions, handleApi } from '../global.api';
import { Teachers } from '@/types/types';

import { IGetAllTeachers, ITeacher, ITeacherBio } from '@/interfaces/ITeacher';
import { LoginPayloadType } from '@/types/loginType';
import { Roles } from '@/constants/role.enum';

export class TeacherService {
  // { role : Teacher }
  static async login(role:string=Roles.Teacher,formData: LoginPayloadType) {
    const config: HandleApiOptions<LoginPayloadType> = {
      endPoint: AuthRouter.login,
      method: 'post',
      payload: formData,
      headers: { role: role },
    };
    return await handleApi<LoginPayloadType, Partial<ITeacherBio>>(config);
  }

  static async verifyTeacher(role:string=Roles.Teacher,email: string) {
    const config: HandleApiOptions<null> = {
      endPoint: `${TeacherRoute.verifyTeacher}/${email}`,
      method: 'get',
      payload: null,
      headers: { role: role },
    };
    return await handleApi<LoginPayloadType, {id:string}>(config);
  }


  // { role : School }
  static async addBio(role:string=Roles.Teacher,formData: FormData) {
    const config: HandleApiOptions<FormData> = {
      endPoint: TeacherRoute.addBio,
      method: 'post',
      payload: formData,
      headers: { role: role },
    };
    return await handleApi<FormData, Partial<ITeacherBio>>(config);
  }

  static async addProfessional(role:string=Roles.Teacher,teacherId: string, formData: Partial<ITeacher>) {
    const config: HandleApiOptions<Partial<ITeacher>> = {
      endPoint: `${TeacherRoute.addProfessional}/${teacherId}`,
      method: 'post',
      payload: formData,
      headers: { role: role },
    };

    return await handleApi<Partial<ITeacher>, Partial<ITeacher>>(config);
  }

  static async get(role:string=Roles.Teacher, id: string) {
    const config: HandleApiOptions<null> = {
      endPoint: `/teacher/${id}`,
      method: 'get',
      headers: { role: role },
    };

    return await handleApi<null, Teachers>(config);
  }

  static async getAll(role:string=Roles.Teacher) {
    const config: HandleApiOptions<null> = {
      method: 'get',
      endPoint: TeacherRoute.getAll,
      payload: null,
      headers: { role: role },
    };

    return await handleApi<null, IGetAllTeachers>(config);
  }

  static async editBio(role:string=Roles.Teacher,id: string, formData: FormData) {
    const config: HandleApiOptions<FormData> = {
      endPoint: `${TeacherRoute.updateBio}/${id}`,
      method: 'patch',
      payload: formData,
      headers: { role: role },
    };

    return await handleApi(config);
  }

  static async editProfessional(role:string=Roles.Teacher,id: string, formData: Partial<ITeacher>) {
    
    const config: HandleApiOptions<Partial<ITeacher>> = {
      endPoint: `${TeacherRoute.updateProfessional}/${id}`,
      method: 'patch',
      payload: formData,
      headers: { role: role },
    };

    return await handleApi(config);
  }

  static async getAllUnAssigned(role:string=Roles.Teacher,center: string) {
    const config: HandleApiOptions<null> = {
      method: 'get',
      endPoint: TeacherRoute.getAllUnAssigned,
      payload: null,
      params: { center: center },
      headers: { role: role },
    };

    return await handleApi<null, ITeacherBio[]>(config);
  }
}
