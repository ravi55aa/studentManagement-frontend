import { IAttachment } from "@/components/HomeworkCard";

export type ChatRoomType = "direct" | "batch" | "center";

export interface IMessage {

    chatRoomId: string;

    senderId: string;

    message: string;

    attachments?: IAttachment[];

    readBy: string;

    isBroadcast?: boolean; // for center messages
    updateAT?: string; // for center messages
}

export interface IChatRoom  {
    _id: string;
    type: ChatRoomType;

    name?: string; // batch / center name

    participants: string; // users in chat

    //  Optional relations-Only for batchRoom | centerRoom
    batchId?: string;
    centerId?: string;

    //  Last message optimization
    lastMessage?: string;
    lastMessageAt?: Date;

    createdBy?: string;
}