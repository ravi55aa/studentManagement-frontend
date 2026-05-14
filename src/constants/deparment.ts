import { IDepartment_obj } from '@/interfaces/Idepartment';

export const department_obj: IDepartment_obj = {
  MATHEMATICS: 'mathematics',
  SCIENCE: 'science',
  ENGLISH: 'english',
  SOCIAL_SCIENCE: 'social science',
  LANGUAGES: 'languages',
  COMPUTER_SCIENCE: 'computer science',
  PHYSICAL_EDUCATION: 'physical education',
  ARTS: 'arts',
};

export const department_Array: string[] = [
  'mathematics',
  'science',
  'english',
  'social science',
  'languages',
  'computer science',
  'physical education',
  'arts',
];


export const department_filter_values = department_Array.map( (department)=>{
                                  return {
                                    name:department.toUpperCase(),value:department
                                  }});