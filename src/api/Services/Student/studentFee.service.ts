import { StripeRouter, StudentRouter } from '@/constants/routes.contants';
import { HandleApiOptions, handleApi } from '@/api/global.api';
import { Roles } from '@/constants/role.enum';
import { IStudentFee } from '@/interfaces/IStudent';
import { BaseService } from '../Base.Service';

export class StudentFeeService extends BaseService {

  static pay(credential: Record<string, string | number> = {}) {
    return this.post<Record<string, string | number>, { clientSecret: string }>(
      StripeRouter.pay,
      credential
    );
  }

  static getAllStudentFeeDetails(userId: string) {
    return this.get<IStudentFee[]>(
      `${StudentRouter.studentPaidFeeDetails}/${userId}`
    );
  }

}
