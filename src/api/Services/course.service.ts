import { CourseRoute } from '@/constants/routes.contants';
import { ICourseForm } from '@/interfaces/ICourseForm';
import { IGetAllArrayOfCourses, IGetAllCourse } from '@/types/tcourse';
import { BaseService } from './Base.Service';

export class CourseService extends BaseService {

  static create(formData: FormData) {
    return this.post<FormData, ICourseForm>(
      CourseRoute.add,
      formData
    );
  }

  static getAll() {
    return this.get<IGetAllArrayOfCourses>(
      CourseRoute.get
    );
  }

  static getById(id: string) {
    return this.get<IGetAllCourse>(
      `${CourseRoute.get}/${id}`
    );
  }

  static update(id: string, formData: FormData) {
    return this.put<FormData, ICourseForm>(
      `${CourseRoute.edit}/${id}`,
      formData
    );
  }

  static deleteCourse(id: string) {
    return this.delete<{ message: string }>(
      `${CourseRoute.get}/${id}`
    );
  }
}