import { NotificationService } from "@/api/Services/notification.service";
import { useAppSelector } from "@/hooks/useStoreHooks";
import { IUserNotification } from "@/interfaces/INotification";
import { useCallback, useEffect, useState } from "react";;
import { toast } from "react-toastify";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    notifications: IUserNotification[];
    onMarkAsRead: (id: string) => void;
};

export default function NotificationModal({
    isOpen,
    onClose,
    notifications,
    onMarkAsRead,
    }: Props) {
    const {user}=useAppSelector((state)=>state.currentUser);
    const [notifies, setNotifications] = useState<IUserNotification[]>([]);
    const [activeTab, setActiveTab] = useState<"unread" | "read">("unread");

        const fetchNotifications=async()=>{
            const res=await NotificationService.getUserNotifications(user.role,user.id);

            if(!res.success){
                toast.warn(res.error.message);
                return res.success;
            }

            const data=res.data?.data || [];
            setNotifications(data);

            return res.success;
        }

    useEffect(()=>{
            fetchNotifications();
        },[user]);

    if (!isOpen) return null;

    const unread = notifies?.filter((n) => !n.isRead);
    const read = notifies?.filter((n) => n.isRead);
    

    const handleMarkAsRead = async (notificationId:string)=>{
        const res=await NotificationService.markNotificationAsRead(user.role,notificationId);

        if(!res.success){
            toast.warn(res.error.message);
            return res.success;
        }

        await fetchNotifications()

        return res.success;
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
        <div className="w-[350px] bg-white h-full shadow-lg p-4 flex flex-col">

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Notifications</h2>
            <button onClick={onClose}>✖</button>
            </div>

            {/* Tabs */}
            <div className="flex border-b mb-4">
            <button
                className={`flex-1 py-2 ${
                activeTab === "unread" ? "border-b-2 border-green-700 font-semibold" : ""
                }`}
                onClick={() => setActiveTab("unread")}
            >
                Unread ({unread.length})
            </button>
            <button
                className={`flex-1 py-2 ${
                activeTab === "read" ? "border-b-2 border-green-700 font-semibold" : ""
                }`}
                onClick={() => setActiveTab("read")}
            >
                Read ({read.length})
            </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto space-y-3">
            {(activeTab === "unread" ? unread : read).length === 0 && (
                <p className="text-sm text-gray-500 text-center mt-10">
                No notifications
                </p>
            )}

            {(activeTab === "unread" ? unread : read).map((n:IUserNotification) => (
                <div
                key={n.createdAt as string}
                className="border rounded-md p-3 flex justify-between items-start"
                >
                <div>
                    <p className="text-sm">{n?.notificationId?.message }</p>
                    {n.createdAt && (
                    <span className="text-xs text-gray-400">
                        {n.createdAt?.split('T')[0]}
                    </span>
                    )}
                </div>

                {!n.isRead && (
                    <button
                    onClick={() => handleMarkAsRead(n?._id as string)}
                    className="text-xs bg-green-700 text-white px-2 py-1 rounded"
                    >
                    Mark Read
                    </button>
                )}
                </div>
            ))}
            </div>
        </div>
        </div>
    );
}