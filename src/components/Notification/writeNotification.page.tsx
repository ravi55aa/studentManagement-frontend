import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAppSelector } from "@/hooks/useStoreHooks";
import { handleApi, HandleApiOptions } from "@/api/global.api";
import { useSocket } from "@/hooks/useAppContext";

export default function AddNotificationPage() {

    const socket=useSocket();
    
    console.log("Socket value:", socket);

    
    useEffect(()=>{
        if(!socket) {
            console.log("No-socket");
            return;
        }
        
        // socket.onAny((event, ...args) => {
        //     console.log("Event received:", event, args);
        //});

        socket.on("notification:new",(data)=>{
            alert(`${data.title} - ${data.message}`);
        });

        return ()=>{
            socket.off("notification:new")
        };
    },[socket]);


    const currentUser = useAppSelector(
        (state) => state.currentUser.user
    );

    const [form, setForm] = useState({
        type: "GENERAL",
        title: "",
        message: "",
        link: "",
        attachmentUrl: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<
        HTMLInputElement |
        HTMLSelectElement |
        HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {

        if (!form.title.trim() || !form.message.trim()) {
        toast.error("Title & Message are required");
        return;
        }

        try {
        setLoading(true);

        const payload = {
            type: form.type,
            title: form.title.trim(),
            message: form.message.trim(),
            link: form.link || undefined,
            attachmentUrl: form.attachmentUrl || undefined,

            sender: {
            model: currentUser.role,
            id: currentUser.id,
            },
        };

        const config:HandleApiOptions<object>={
            endPoint: "/notification/new",
            method: "post",
            payload,
            headers:{role:"Admin"}
        }

        const res = await handleApi(config);

        if (!res.success) {
            toast.error("Failed to send notification");
            return;
        }

        toast.success("Notification sent successfully");

        // Reset form
        setForm({
            type: "GENERAL",
            title: "",
            message: "",
            link: "",
            attachmentUrl: "",
        });

        } catch (error) {
            toast.error(`Something went wrong ${error}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">

        <h2 className="text-xl font-semibold">
            Send Notification
        </h2>

        {/* Type */}
        <div>
            <label className="block text-sm mb-1">
            Type
            </label>
            <select
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            >
            <option value="GENERAL">General</option>
            <option value="ALERT">Alert</option>
            <option value="REMINDER">Reminder</option>
            <option value="ANNOUNCEMENT">Announcement</option>
            <option value="SYSTEM">System</option>
            </select>
        </div>

        {/* Title */}
        <div>
            <label className="block text-sm mb-1">
            Title
            </label>
            <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            />
        </div>

        {/* Message */}
        <div>
            <label className="block text-sm mb-1">
            Message
            </label>
            <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded-md p-2"
            />
        </div>

        {/* Optional Link */}
        <div>
            <label className="block text-sm mb-1">
            Link (optional)
            </label>
            <input
            name="link"
            value={form.link}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            />
        </div>

        {/* Optional Attachment */}
        <div>
            <label className="block text-sm mb-1">
            Attachment URL (optional)
            </label>
            <input
            name="attachmentUrl"
            value={form.attachmentUrl}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            />
        </div>

        <div className="flex justify-end">
            <button
            disabled={loading}
            onClick={handleSubmit}
            className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800 disabled:opacity-50"
            >
            {loading ? "Sending..." : "Send"}
            </button>
        </div>

        </div>
    );
}
