import { NotificationRoutes } from '@/constants/routes.contants';
import { HandleApiOptions, handleApi } from '../global.api';
import { Roles } from '@/constants/role.enum';
import { INotification } from '@/types/types';
import { IUserNotification } from '@/interfaces/INotification';
import { BaseService } from './Base.Service';

export class NotificationService extends BaseService {

    static create(form: INotification) {
    return this.post<INotification, INotification>(
      NotificationRoutes.newAdd,
      form
    );
  }

  static getAll() {
    return this.get<INotification[]>(
      NotificationRoutes.getAll
    );
  }

  static getUserNotifications(userId: string) {
    return this.get<IUserNotification[]>(
      `${NotificationRoutes.getUserNotification}/${userId}`
    );
  }

  static markNotificationAsRead(notificationId: string) {
    return this.patch<null, IUserNotification>(
      `${NotificationRoutes.markAsRead}/${notificationId}`,
      null
    );
  }
}