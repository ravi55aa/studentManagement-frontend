// import { NotificationRoutes } from '@/constants/routes.contants';
// import { HandleApiOptions, handleApi } from '../global.api';


// export class NotificationService {
//     static async create(form: ICreateNotification) {
//         const config: HandleApiOptions<ICreateNotification> = {
//         method: 'post',
//         endPoint: NotificationRoutes.newAdd,
//         payload: form,
//         headers: { role: 'School' },
//         };

//         return await handleApi<ICreateNotification, INotification>(config);
//     }

//     static async getAll() {
//         const config: HandleApiOptions<null> = {
//         method: 'get',
//         endPoint: NotificationRoutes.get_All,
//         payload: null,
//         headers: { role: 'School' },
//         };

//         return await handleApi<null, IGetAllNotifications>(config);
//     }
// }
