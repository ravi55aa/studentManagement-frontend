import { ITeacherBio } from "@/interfaces/ITeacher";

const ChatHeader = ({ title,directChatWith }: { title: string,directChatWith:ITeacherBio }) => {
    return (
        <div className="p-4 border-b bg-white">
        <h3 className="font-semibold text-green-700">{title} Chat</h3>
        {title=='DIRECT' && <span className="bold">{directChatWith?.firstName.toLocaleUpperCase()}</span>}
        </div>
    );
};

export default ChatHeader;