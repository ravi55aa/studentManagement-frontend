import { TeacherRoute,AuthRouter } from '@/constants/routes.contants';
import { HandleApiOptions, handleApi } from '@/api/global.api';
import { Teachers } from '@/types/types';

import { IGetAllTeachers, ITeacher, ITeacherBio } from '@/interfaces/ITeacher';
import { LoginPayloadType } from '@/types/loginType';


export class TeacherService {
  // { role : Student }
    static async login(formData: LoginPayloadType) {
        const config: HandleApiOptions<LoginPayloadType> = {
        endPoint: AuthRouter.login,
        method: 'post',
        payload: formData,
        headers: { role: 'Student' },
        };

        return await handleApi<LoginPayloadType, Partial<ITeacherBio>>(config);
    }

    static async verifyTeacher(email: string) {
        const config: HandleApiOptions<null> = {
        endPoint: `${TeacherRoute.verifyTeacher}/${email}`,
        method: 'get',
        payload: null,
        headers: { role: 'Teacher' },
        };
        return await handleApi<LoginPayloadType, {id:string}>(config);
    }


    // { role : School }
    static async addBio(formData: FormData) {
        const config: HandleApiOptions<FormData> = {
        endPoint: TeacherRoute.addBio,
        method: 'post',
        payload: formData,
        headers: { role: 'School' },
        };
        return await handleApi<FormData, Partial<ITeacherBio>>(config);
    }

    static async addProfessional(teacherId: string, formData: Partial<ITeacher>) {
        const config: HandleApiOptions<Partial<ITeacher>> = {
        endPoint: `${TeacherRoute.addProfessional}/${teacherId}`,
        method: 'post',
        payload: formData,
        headers: { role: 'School' },
        };

        return await handleApi<Partial<ITeacher>, Partial<ITeacher>>(config);
    }

    static async get(id: string) {
        const config: HandleApiOptions<null> = {
        endPoint: `/teacher/${id}`,
        method: 'get',
        headers: { role: 'School' },
        };

        return await handleApi<null, Teachers>(config);
    }

    static async getAll() {
        const config: HandleApiOptions<null> = {
        method: 'get',
        endPoint: TeacherRoute.getAll,
        payload: null,
        headers: { role: 'School' },
        };

        return await handleApi<null, IGetAllTeachers>(config);
    }

    static async editBio(id: string, formData: FormData) {
        const config: HandleApiOptions<FormData> = {
        endPoint: `${TeacherRoute.updateBio}/${id}`,
        method: 'patch',
        payload: formData,
        headers: { role: 'School' },
        };

        return await handleApi(config);
    }

    static async editProfessional(id: string, formData: Partial<ITeacher>) {
        const config: HandleApiOptions<Partial<ITeacher>> = {
        endPoint: `${TeacherRoute.updateProfessional}/${id}`,
        method: 'patch',
        payload: formData,
        headers: { role: 'School' },
        };

        return await handleApi(config);
    }

    static async getAllUnAssigned(center: string) {
        const config: HandleApiOptions<null> = {
        method: 'get',
        endPoint: TeacherRoute.getAllUnAssigned,
        payload: null,
        params: { center: center },
        headers: { role: 'School' },
        };

        return await handleApi<null, ITeacherBio[]>(config);
    }
}
