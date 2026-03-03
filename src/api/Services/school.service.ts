import { SchoolRoute } from '@/constants/routes.contants';
import { HandleApiOptions, handleApi } from '../global.api';
import { ISchoolFormData } from '@/interfaces/IRegister';
import { ISubjectReducer } from '@/utils/Redux/Reducer/school.reducer';

export class SchoolService {
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
        const config: HandleApiOptions<null> = {
        method: "get",
        endPoint: SchoolRoute.viewSchool,
        payload: null,
        headers: { role: "School" }
        };

        return await handleApi<null, ISubjectReducer>(config);
    }

    static async resetPassword(userId: string, data: object) {
        const config: HandleApiOptions<object> = {
        method: 'patch',
        endPoint: `${SchoolRoute.resetPassword}/${userId}`,
        payload: data,
        headers: { role: 'School' },
        };

        return await handleApi<object, null>(config);
    }
}
