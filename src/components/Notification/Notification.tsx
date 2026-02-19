import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreHooks";
import { Section } from "../Teacher/Section";
import { Bell } from "lucide-react";
import { handleApi, HandleApiOptions } from "@/api/global.api";
import { toast } from "react-toastify";
import { INotification } from "@/types/types";
import { storeNotification } from "@/utils/Redux/Reducer/notifications";


export default function NotificationListPage() {

    const dispatch=useAppDispatch();

    const notifications: INotification[] = useAppSelector(
        (state) => state.notifications.notifications
    ) || [];

    
    /**
         * Fetch all notifications
    */
        useEffect(()=>{
                (async()=>{
                    const config:HandleApiOptions<null>=
                        {
                            method:"get",
                            endPoint:"/notifications/get-all",
                            payload:null,
                            headers:{role:"School"}
                        }
    
                    const res=await handleApi<null,INotification[]>(config);
                    
                    if(!res.success){
                        toast.warn(res.data.error);
                        return;
                    }
    
                    const notifications=res.data.data;
                    dispatch(storeNotification(notifications));

                    return true;
                })();
        },[dispatch])



    return (
        <div className="max-w-5xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-md">

        <Section title="Notifications">

            {notifications.length === 0 ? (
            <div className="flex flex-col items-center py-16 text-gray-500">
                <Bell size={40} />
                <p className="mt-3">No notifications available</p>
            </div>
            ) : (
            <div className="space-y-4">

                {notifications.map((notification) => (

                <NotificationCard
                    key={notification._id}
                    notification={notification}
                />
                ))}
            </div>
            )}
        </Section>
        </div>
    );
}


function NotificationCard({
    notification,
    }: {
    notification:INotification;
    }) {

    const {
        type,
        title,
        message,
        link,
        createdAt,
        isRead,
    } = notification;

    return (
        <div
        className={`border rounded-lg p-5 transition hover:shadow-md cursor-pointer
            ${!isRead ? "bg-green-50 border-green-300" : "bg-white"}
        `}
        >

        <div className="flex justify-between items-start">

            <div className="space-y-1">

            <div className="flex items-center gap-2">

                <TypeBadge type={type} />

                {!isRead && (
                <span className="text-xs text-green-600 font-medium">
                    New
                </span>
                )}

            </div>

            <h3 className="font-semibold text-base">
                {title}
            </h3>

            <p className="text-sm text-gray-600">
                {message}
            </p>

            {link && (
                <a
                href={link}
                className="text-sm text-blue-600 underline"
                >
                View More
                </a>
            )}

            </div>

            <span className="text-xs text-gray-400">
            {new Date(createdAt).toLocaleString()}
            </span>

        </div>

        </div>
    );
}



function TypeBadge({ type }: { type: string }) {
    const colors: Record<string, string> = {
        GENERAL: "bg-gray-200 text-gray-700",
        ALERT: "bg-red-100 text-red-700",
        REMINDER: "bg-yellow-100 text-yellow-700",
        ANNOUNCEMENT: "bg-blue-100 text-blue-700",
        SYSTEM: "bg-purple-100 text-purple-700",
    };

    return (
        <span
        className={`px-2 py-1 text-xs rounded font-medium ${colors[type] || "bg-gray-200 text-gray-700"}`}
        >
        {type}
        </span>
    );
}
