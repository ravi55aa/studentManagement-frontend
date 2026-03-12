import { StudentRouter,AuthRouter } from '@/constants/routes.contants';
import { HandleApiOptions, handleApi } from '@/api/global.api';
import { LoginPayloadType } from '@/types/loginType';
import { IStudent } from '@/interfaces/IStudent';


export class StudentService {
  // { role : Student }
    static async login(formData: LoginPayloadType) {
        const config: HandleApiOptions<LoginPayloadType> = {
        endPoint: AuthRouter.login,
        method: 'post',
        payload: formData,
        headers: { role: 'Student' },
        };

        return await handleApi<LoginPayloadType, Partial<IStudent>>(config);
    }

    static async verifyStudent(email: string) {
        const config: HandleApiOptions<null> = {
        endPoint: `${StudentRouter.verifyStudent}/${email}`,
        method: 'get',
        payload: null,
        headers: { role: 'Student' },
        };
        return await handleApi<LoginPayloadType, {id:string}>(config);
    }


    // { role : School }
    static async add(formData: FormData,batchId:string) {
        const config: HandleApiOptions<FormData> = {
        endPoint: `${StudentRouter.add}/${batchId}`,
        method: 'post',
        payload: formData,
        headers: { role: 'School' },
        };
        return await handleApi<FormData, Partial<IStudent>>(config);
    }

    // static async addProfessional(StudentId: string, formData: Partial<IStudent>) {
    //     const config: HandleApiOptions<Partial<IStudent>> = {
    //     endPoint: `${StudentRouter.addProfessional}/${StudentId}`,
    //     method: 'post',
    //     payload: formData,
    //     headers: { role: 'School' },
    //     };

    //     return await handleApi<Partial<IStudent>, Partial<IStudent>>(config);
    // }

    // static async get(id: string) {
    //     const config: HandleApiOptions<null> = {
    //     endPoint: `/Student/${id}`,
    //     method: 'get',
    //     headers: { role: 'School' },
    //     };

    //     return await handleApi<null, Students>(config);
    // }

    // static async getAll() {
    //     const config: HandleApiOptions<null> = {
    //     method: 'get',
    //     endPoint: StudentRouter.getAll,
    //     payload: null,
    //     headers: { role: 'School' },
    //     };

    //     return await handleApi<null, IGetAllStudents>(config);
    // }

    // static async editBio(id: string, formData: FormData) {
    //     const config: HandleApiOptions<FormData> = {
    //     endPoint: `${StudentRouter.updateBio}/${id}`,
    //     method: 'patch',
    //     payload: formData,
    //     headers: { role: 'School' },
    //     };

    //     return await handleApi(config);
    // }

    // static async editProfessional(id: string, formData: Partial<IStudent>) {
    //     const config: HandleApiOptions<Partial<IStudent>> = {
    //     endPoint: `${StudentRouter.updateProfessional}/${id}`,
    //     method: 'patch',
    //     payload: formData,
    //     headers: { role: 'School' },
    //     };

    //     return await handleApi(config);
    // }

    // static async getAllUnAssigned(center: string) {
    //     const config: HandleApiOptions<null> = {
    //     method: 'get',
    //     endPoint: StudentRouter.getAllUnAssigned,
    //     payload: null,
    //     params: { center: center },
    //     headers: { role: 'School' },
    //     };

    //     return await handleApi<null, IStudentBio[]>(config);
    // }
}
