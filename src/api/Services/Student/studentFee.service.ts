import { StripeRouter, StudentRouter } from '@/constants/routes.contants';
import { HandleApiOptions, handleApi } from '@/api/global.api';
import { Roles } from '@/constants/role.enum';
import { IStudentFee } from '@/interfaces/IStudent';

export class StudentFeeService {
    static async pay(role:string=Roles.Student,credential: Record<string,string|number>={}) {
        const config: HandleApiOptions<object> = {
        method: 'post',
        endPoint: StripeRouter.pay,
        payload: credential,
        headers: { role: role },
        };

        return await handleApi<object, {'clientSecret':string}>(config);
    }

    static async getAllStudentFeeDetails(role:string=Roles.Student,userId:string) {
        const config: HandleApiOptions<object> = {
        method: 'get',
        endPoint: `${StudentRouter.studentPaidFeeDetails}/${userId}`,
        payload: null,
        headers: { role: role },
        };

        return await handleApi<object, IStudentFee[]>(config);
    }

}
