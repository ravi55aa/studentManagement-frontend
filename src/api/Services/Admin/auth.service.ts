import { SuperAdminRouter } from '@/constants/routes.contants';
import { BaseService } from '../Base.Service'; 

export class SuperAdminService extends BaseService {

  //  Create Plan
    static signIn(payload: {email:string,password:string}) {
        return this.post<Record<string,string>, null>(
        SuperAdminRouter.login,
        payload,
        );
    }
}