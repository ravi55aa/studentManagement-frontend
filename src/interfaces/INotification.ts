import { NotificationType } from "@/types/typesNotification";

export interface INotification {
    type: NotificationType;

    title: string;
    message: string;

    link?: string;
    attachmentUrl?: string;
}

export interface IUserNotification {
    userId: object|string;
    notificationId: INotification|string;
    isRead: boolean;
    createdAt: string;
}
