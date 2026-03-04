import { ICourseForm } from '@/interfaces/ICourseForm';
import { IAcademicCourse, IAcademicCourseMeta } from '@/interfaces/ISchool';

export type IGetAllCourse = { course: ICourseForm; meta: IAcademicCourseMeta };

export type IGetAllArrayOfCourses = {
  courses: IAcademicCourse[];
  courses_meta: IAcademicCourseMeta[];
};
