import { StudentRouter,AuthRouter } from '@/constants/routes.contants';
import { HandleApiOptions, handleApi } from '@/api/global.api';
import { LoginPayloadType } from '@/types/loginType';
import { IStudent } from '@/interfaces/IStudent';
import { Roles } from '@/constants/role.enum';
import { BaseService } from '../Base.Service';


export class StudentService extends BaseService {

  static login(formData: LoginPayloadType) {
    return this.post<LoginPayloadType, Partial<IStudent>>(
      AuthRouter.login,
      formData
    );
  }

  static verifyStudent(email: string) {
    return this.get<{ id: string }>(
      `${StudentRouter.verifyStudent}/${email}`
    );
  }

  static add(formData: FormData, batchId: string) {
    return this.post<FormData, Partial<IStudent>>(
      `${StudentRouter.add}/${batchId}`,
      formData
    );
  }

  static getById(id: string) {
    return this.get<Partial<IStudent>>(
      `/Student/bio/${id}`
    );
  }

  static update(id: string, formData: FormData) {
    return this.patch<FormData, unknown>(
      `${StudentRouter.update}/${id}`,
      formData
    );
  }

  static getALLWithQuery(
    query: Record<string, string | number | boolean> = {}
  ) {
    return this.get<IStudent[]>(
      StudentRouter.getAll,
      query
    );
  }
}
