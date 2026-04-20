import { StudentRouter } from '@/constants/routes.contants';
import { HandleApiOptions, handleApi } from '@/api/global.api';
import { IStudent } from '@/interfaces/IStudent';
import { Roles } from '@/constants/role.enum';
import { ILeaveDocument, IStudentAttendance,IStudentAttendanceMain } from '@/interfaces/IAttendance';
import { BaseService } from '../Base.Service';


export class AttendanceService extends BaseService {

  static update(
    attendanceData: IStudentAttendance[],
    batchId: string,
    date: string
  ) {
    return this.post<IStudentAttendance[], Partial<IStudent>>(
      `${StudentRouter.updateAttendance}/${batchId}`,
      attendanceData,
      { date }
    );
  }

  static getAStudentList(data: {
    studentId: string;
    year: number;
    month: number;
  }) {
    return this.get<Record<number, string>>(
      StudentRouter.getAStudentList,
      data
    );
  }

  static getAllWithQuery(
    query: Record<string, string | number> = {}
  ) {
    return this.get<Partial<IStudentAttendanceMain[]>>(
      StudentRouter.getallAttendances,
      query
    );
  }

  static getAttendanceOfBatch(
    query: Record<string, string | number> = {}
  ) {
    return this.get<Partial<IStudentAttendanceMain | null>>(
      StudentRouter.getBatchAttendance,
      query
    );
  }

  static getByQuery(
    query: {
      studentId: string;
      year: number;
      month: number;
    }
  ) {
    return this.get<Record<number, string>>(
      StudentRouter.getAStudentList,
      query
    );
  }

  static applyLeave(data: ILeaveDocument, studentId: string) {
    return this.post<ILeaveDocument, null>(
      `${StudentRouter.applyLeave}/${studentId}`,
      data
    );
  }

  static updateAppliedLeave(
    studentId: string,
    batchId: string,
    query: { status: string; date: string }
  ) {
    return this.patch<null, null>(
      `${StudentRouter.updateAppliedLeave}/${studentId}/${batchId}`,
      null,
      query
    );
  }

  static getLeaveHistory(studentId: string, date: string) {
    return this.get<ILeaveDocument>(
      `${StudentRouter.getLeaveHistory}/${studentId}`,
      { date }
    );
  }
}
