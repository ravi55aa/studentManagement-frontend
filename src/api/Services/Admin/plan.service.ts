import { PlanRoute } from '@/constants/routes.contants';
import { BaseService } from '../Base.Service'; 
import { Roles } from '@/constants/role.enum';
import { IPlan } from '@/interfaces/IPlan'; 
import { HandleApiOptions,handleApi } from '@/api/global.api';

export class PlanService extends BaseService {

  //  Create Plan
    static create(data: Partial<IPlan>) {
        return this.post<Partial<IPlan>, IPlan>(
        PlanRoute.create,
        data,
        );
    }

    //  Get All Plans (with query support)
    static getAll(
        query: Record<string, string | number | boolean> = {}
    ) {
        return this.get<IPlan[]>(
        PlanRoute.getAll,
        {
            role: Roles.Admin,
            params: query,
        }
        );
    }

    //  Get Single Plan
    static getById(id: string) {
        return this.get<IPlan>(
        `${PlanRoute.getById}/${id}`,
        {
            role: Roles.Admin,
        }
        );
    }

    //  Update Plan
    static update(id: string, data: Partial<IPlan>) {
        return this.patch<Partial<IPlan>, IPlan>(
        `${PlanRoute.update}/${id}`,
        data
        );
    }

    // Delete Plan
    static async delete(id: string) {
        const config: HandleApiOptions<null> = {
            method: 'delete',
            endPoint: `${PlanRoute.delete}/${id}`,
        };
    
        return await handleApi<null, IPlan>(config);
    }

    //  Toggle Active Status
    static toggleActive(id: string, isActive: boolean) {
        return this.patch<{ isActive: boolean }, IPlan>(
        `${PlanRoute.toggleActive}/${id}`,
        { isActive },
        );
    }

    //  Toggle Popular Plan
    static togglePopular(id: string, isPopular: boolean) {
        return this.patch<{ isPopular: boolean }, IPlan>(
        `${PlanRoute.togglePopular}/${id}`,
        { isPopular }
        );
    }
}