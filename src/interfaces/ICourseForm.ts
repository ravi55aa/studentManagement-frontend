/* ===================== TYPES ===================== */

import { IAttachment } from "@/components/HomeworkCard";

export type CourseStatus = 'active' | 'inactive';
export type DurationUnit = 'hours' | 'months' | 'years';

export interface ICourseForm {
  name: string;
  code: string;
  academicYear: string;
  //level: string;
  description: string;
  status: CourseStatus;

  duration: {
    value: number;
    unit: DurationUnit;
  };

  schedule: {
    startDate: string;
    endDate: string;
  };

  maxStudents: number;
  enrollmentOpen: boolean;

  subjects: string[];
  classes: string[];
  coordinators: string[];

  eligibilityCriteria: string;
  syllabusUrl: string;
  attachments: File[] | IAttachment[];
  modelType: string;
  center: string;
}

export const initialForm: ICourseForm = {
  name: '',
  code: '',
  academicYear: '',
  //level: "",
  description: '',
  status: 'active',

  duration: {
    value: 0,
    unit: 'hours',
  },

  schedule: {
    startDate: '',
    endDate: '',
  },

  modelType: 'School',
  center: '',

  maxStudents: 0,
  enrollmentOpen: true,

  subjects: [],
  classes: [],
  coordinators: [],

  eligibilityCriteria: '',
  syllabusUrl: '',
  attachments: [] as File[],
};
