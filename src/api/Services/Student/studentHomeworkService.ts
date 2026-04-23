import { handleApi,HandleApiOptions } from '@/api/global.api';
import { Roles } from '@/constants/role.enum';
import { HomeworkRoute, StudentHomeworkRoute, SubjectRoute } from '@/constants/routes.contants';
import { IHomework, IHomeworkSubmission } from '@/interfaces/IHomework';
import { BaseService } from '../Base.Service';


export class StudentHomeworkService extends BaseService {

  static submit(formData: FormData, homeworkId: string) {
    return this.post<FormData, IHomeworkSubmission>(
      `${StudentHomeworkRoute.submit}/${homeworkId}`,
      formData
    );
  }

  static getAll() {
    return this.get<IHomework[]>(
      StudentHomeworkRoute.getall
    );
  }

  static getAllWithQuery(
    query: Record<string, string | number | boolean> = {}
  ) {
    return this.get<IHomework[]>(
      StudentHomeworkRoute.getall,
      query
    );
  }

  static getAllSubmissions(
    query: Record<string, string | number | boolean> = {}
  ) {
    return this.get<IHomeworkSubmission[]>(
      StudentHomeworkRoute.getall,
      query
    );
  }

  static getById(id: string) {
    return this.get<IHomeworkSubmission>(
      `${StudentHomeworkRoute.get}/${id}`
    );
  }

  static deleteHomework(id: string) {
    return this.delete<{ message: string }>(
      `${SubjectRoute.get}/${id}`
    );
  }

  static update(id: string, formData: FormData) {
    return this.put<FormData, IHomeworkSubmission>(
      `${StudentHomeworkRoute.update}/${id}`,
      formData
    );
  }

  static updateMany(
    homeworkId: string,
    formData: IHomeworkSubmission[]
  ) {
    return this.put<IHomeworkSubmission[], IHomeworkSubmission[]>(
      `${StudentHomeworkRoute.updateMany}/${homeworkId}`,
      formData
    );
  }
}