import { ChatRouter } from '@/constants/routes.contants';
import { HandleApiOptions,handleApi } from '@/api/global.api'; 
import { Roles } from '@/constants/role.enum';
import { IChatRoom, IMessage } from '@/interfaces/IChat';

export class ChatService {

  //  Create Direct Chat
    static async createDirectChat(role:string=Roles.Student,user1: string, user2: string) {
        const config: HandleApiOptions<{ user1: string; user2: string }> = {
        method: "post",
        endPoint: ChatRouter.createDirectChat,
        payload: { user1, user2 },
        headers: { role: role }, // adjust if dynamic
        };

        return await handleApi<{ user1: string; user2: string },IChatRoom>(config);
    }

    //  Get User Chats
    static async getUserChats(role:string=Roles.Student,userId: string) {
        const config: HandleApiOptions<null> = {
        method: "get",
        endPoint: ChatRouter.getUserChats.replace(":userId", userId),
        payload: null,
        headers: { role: role },
        };

        return await handleApi<null, IChatRoom[]>(config);
    }

    //  Send Message
    static async sendMessage(role:string=Roles.Student,chatRoomId: string, message: string) {
        const config: HandleApiOptions<{
        chatRoomId: string;
        message: string;
        }> = {
        method: "post",
        endPoint: ChatRouter.sendMessage,
        payload: { chatRoomId, message },
        headers: { role: role },
        };

        return await handleApi(config);
    }

    //  Get Messages
    static async getMessages(role:string=Roles.Student,chatRoomId: string) {
        const config: HandleApiOptions<null> = {
        method: "get",
        endPoint: ChatRouter.getMessages.replace(
            ":chatRoomId",
            chatRoomId
        ),
        payload: null,
        headers: { role: role },
        };

        return await handleApi<null, IMessage[]>(config);
    }
}
