import { NotificationRoutes } from '@/constants/routes.contants';
import { HandleApiOptions, handleApi } from '../global.api';
import { Roles } from '@/constants/role.enum';
import { INotification } from '@/types/types';
import { IUserNotification } from '@/interfaces/INotification';

export class NotificationService {
    static async create(role:string=Roles.School,form: INotification) {
        const config: HandleApiOptions<INotification> = {
        method: 'post',
        endPoint: NotificationRoutes.newAdd,
        payload: form,
        headers: { role: role },
        };

        return await handleApi<INotification, INotification>(config);
    }

    static async getAll(role:string=Roles.School) {
        const config: HandleApiOptions<null> = {
        method: 'get',
        endPoint: NotificationRoutes.getAll,
        payload: null,
        headers: { role: role },
        };

        return await handleApi<null, INotification[]>(config);
    }


    //userNotification service

    static async getUserNotifications(role:string=Roles.School,userId:string) {
        const config: HandleApiOptions<null> = {
        method: 'get',
        endPoint: `${NotificationRoutes.getUserNotification}/${userId}`,
        payload: null,
        headers: { role: role },
        };

        return await handleApi<null, IUserNotification[]>(config);
    }

    static async markNotificationAsRead(role:string=Roles.School,notificationId:string) {
        const config: HandleApiOptions<null> = {
        method: 'patch',
        endPoint: `${NotificationRoutes.markAsRead}/${notificationId}`,
        payload: null,
        headers: { role: role },
        };

        return await handleApi<null, IUserNotification>(config);
    }
}
