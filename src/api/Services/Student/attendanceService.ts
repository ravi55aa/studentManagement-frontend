import { StudentRouter } from '@/constants/routes.contants';
import { HandleApiOptions, handleApi } from '@/api/global.api';
import { IStudent } from '@/interfaces/IStudent';
import { Roles } from '@/constants/role.enum';
import { ILeaveDocument, IStudentAttendance,IStudentAttendanceMain } from '@/interfaces/IAttendance';


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

    
    static async getAStudentList(role:string=Roles.Teacher,data:{studentId:string,year:number,month:number}) {
        const config: HandleApiOptions<{studentId:string,year:number,month:number}> = {
            endPoint: StudentRouter.getAStudentList,
            method: 'get',
            params: data,
            headers: { role: role },
        };
        
        return await handleApi<{studentId:string,year:number,month:number}, Record<number,string>>(config);
    }

    static async getAllWithQuery(role:string=Roles.Teacher,query:Record<string,string|number>={}) {
        const config: HandleApiOptions<null> = {
        endPoint: StudentRouter.getallAttendances,
        method: 'get',
        payload: null,
        params:query,
        headers: { role: role },
        };

        return await handleApi<null, Partial<IStudentAttendanceMain[]>>(config);
    }

    static async getAttendanceOfBatch(role:string=Roles.Teacher,query:Record<string,string|number>={}) {
        const config: HandleApiOptions<null> = {
        endPoint: StudentRouter.getBatchAttendance,
        method: 'get',
        payload: null,
        params:query,
        headers: { role: role },
        };

        return await handleApi<null, Partial<IStudentAttendanceMain|null>>(config);
    }
    
    static async get(role:string=Roles.Teacher,query:Record<string,string|number>={}) {
        const config: HandleApiOptions<{studentId:string,year:number,month:number}> = {
        endPoint: StudentRouter.getAStudentList,
        method: 'get',
        params: query,
        headers: { role: role },
        };

        return await handleApi<{studentId:string,year:number,month:number}, Record<number,string>>(config);
    }

    static async applyLeave(role:string=Roles.Student,data:ILeaveDocument,studentId:string) {
        const config: HandleApiOptions<ILeaveDocument> = {
        endPoint: `${StudentRouter.applyLeave}/${studentId}`,
        method: 'post',
        payload: data,
        headers: { role: role },
        };

        return await handleApi<ILeaveDocument, null>(config);
    }

    static async getLeaveHistory(role:string=Roles.Student,studentId:string) {
        const config: HandleApiOptions<null> = {
        endPoint: `${StudentRouter.getLeaveHistory}/${studentId}`,
        method: 'get',
        payload: null,
        headers: { role: role },
        };

        return await handleApi<null,ILeaveDocument>(config);
    }
}
