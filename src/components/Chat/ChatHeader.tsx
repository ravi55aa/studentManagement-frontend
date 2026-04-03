import { IStudent } from "@/interfaces/IStudent";
import { ITeacherBio } from "@/interfaces/ITeacher";

const ChatHeader = ({ title,name }: { title: string,name:string }) => {

    return (
        <div className="p-4 border-b bg-white">
        <h3 className="font-semibold text-green-700">{title} Chat</h3>
        {title=='DIRECT' && name && <span className="font-bold">{name?.toUpperCase()}
        </span>}
        </div>
    );
};

export default ChatHeader;