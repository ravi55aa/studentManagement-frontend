import { StudentRouter } from '@/constants/routes.contants';
import { HandleApiOptions, handleApi } from '@/api/global.api';
import { IStudent } from '@/interfaces/IStudent';
import { Roles } from '@/constants/role.enum';
import { IStudentAttendance,IStudentAttendanceMain } from '@/interfaces/IAttendance';


export class AttendanceService {
  // { role : Student }
    static async update(role:string=Roles.Teacher,attendanceData: IStudentAttendance[],batchId:string) {
        const config: HandleApiOptions<IStudentAttendance[]> = {
        endPoint: `${StudentRouter.updateAttendance}/${batchId}`,
        method: 'post',
        payload: attendanceData,
        headers: { role: role },
        };

        return await handleApi<IStudentAttendance[], Partial<IStudent>>(config);
    }

    static async getAllWithQuery(role:string=Roles.Teacher,query:Record<string,string|number>={}) {
        const config: HandleApiOptions<IStudentAttendance[]> = {
        endPoint: StudentRouter.getallAttendances,
        method: 'get',
        payload: null,
        params:query,
        headers: { role: role },
        };

        return await handleApi<IStudentAttendance[], Partial<IStudentAttendanceMain[]>>(config);
    }

    static async getAStudentList(role:string=Roles.Teacher,data:{studentId:string,year:number,month:number}) {
        const config: HandleApiOptions<{studentId:string,year:number,month:number}> = {
        endPoint: StudentRouter.getAStudentList,
        method: 'get',
        params: data,
        headers: { role: role },
        };

        return await handleApi<{studentId:string,year:number,month:number}, Record<number,string>>(config);
    }
}
