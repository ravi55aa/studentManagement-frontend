import { ChatRouter } from '@/constants/routes.contants';
import { IChatRoom, IMessage } from '@/interfaces/IChat';
import { BaseService } from '../Base.Service';

export class ChatService extends BaseService {

  static createDirectChat(user1: string, user2: string) {
    return this.post<{ user1: string; user2: string }, IChatRoom>(
      ChatRouter.createDirectChat,
      { user1, user2 }
    );
  }

  static createBatchChat(batchId: string) {
    return this.post<{ batchId: string }, IChatRoom>(
      ChatRouter.createBatchChat,
      { batchId }
    );
  }

  static getUserChats(userId: string) {
    return this.get<IChatRoom[]>(
      ChatRouter.getUserChats.replace(":userId", userId)
    );
  }

  static sendMessage(chatRoomId: string, message: string) {
    return this.post<
      { chatRoomId: string; message: string },
      unknown
    >(
      ChatRouter.sendMessage,
      { chatRoomId, message }
    );
  }

  static getMessages(chatRoomId: string) {
    return this.get<IMessage[]>(
      ChatRouter.getMessages.replace(":chatRoomId", chatRoomId)
    );
  }
}
