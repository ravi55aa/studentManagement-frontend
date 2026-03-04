import { CourseRoute } from '@/constants/routes.contants';
import { HandleApiOptions, handleApi } from '../global.api';
import { ICourseForm } from '@/interfaces/ICourseForm';
import { IGetAllArrayOfCourses, IGetAllCourse } from '@/types/tcourse';

export class CourseService {
  static async create(formData: FormData) {
    const config: HandleApiOptions<FormData> = {
      method: 'post',
      endPoint: CourseRoute.add,
      payload: formData,
      headers: { role: 'School' },
    };

    return await handleApi<FormData, ICourseForm>(config);
  }

  static async getAll() {
    const config: HandleApiOptions<null> = {
      method: 'get',
      endPoint: CourseRoute.get,
      payload: null,
      headers: { role: 'School' },
    };

    return await handleApi<null, IGetAllArrayOfCourses>(config);
  }

  static async get(id: string) {
    const config: HandleApiOptions<null> = {
      method: 'get',
      endPoint: `${CourseRoute.get}/${id}`,
      payload: null,
      headers: { role: 'School' },
    };

    return await handleApi<null, IGetAllCourse>(config);
  }

  static async update(id: string, formData: FormData) {
    const config: HandleApiOptions<FormData> = {
      method: 'put', // use patch if partial update
      endPoint: `${CourseRoute.edit}/${id}`,
      payload: formData,
      headers: { role: 'School' },
    };

    return await handleApi<FormData, ICourseForm>(config);
  }

  static async delete(id: string) {
    const config: HandleApiOptions<null> = {
      method: 'delete',
      endPoint: `${CourseRoute.get}/${id}`,
      payload: null,
      headers: { role: 'School' },
    };

    return await handleApi<null, { message: string }>(config);
  }
}
