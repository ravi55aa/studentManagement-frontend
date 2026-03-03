import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAppSelector } from "@/hooks/useStoreHooks";
import { handleApi, HandleApiOptions } from "@/api/global.api";
import { useSocket } from "@/hooks/useAppContext";
import { Section } from "../Teacher/Section";
import {InputField,Select} from "@/components";
import { useAppNavigate } from "@/hooks/useNavigate.hook";
import { NotificationRoutes } from "@/constants/routes.contants";
import FormActions from "../FormAction";



export default function AddNotificationPage() {

    const socket=useSocket();
    const {goBack}=useAppNavigate();
    
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
            endPoint: NotificationRoutes.newAdd,
            method: "post",
            payload,
            headers:{role:"Admin"}
        }

        const res = await handleApi(config);

        if (!res.success) {
            toast.error(res.error.message);
            return;
        }

        toast.success(res.data.message);

        // Reset form
        setForm({
            type: "GENERAL",
            title: "",
            message: "",
            link: "",
            attachmentUrl: "",
        });

        } catch (error) {
            toast.error(`NotificationWrong: ${error}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-xl shadow-md">

        <Section title="Send Notification">

            <div className="grid md:grid-cols-2 gap-6">

            <Select
                label="Type"
                name="type"
                value={form.type}
                onChange={handleChange}
                options={[
                { label: "General", value: "GENERAL" },
                { label: "Alert", value: "ALERT" },
                { label: "Reminder", value: "REMINDER" },
                { label: "Announcement", value: "ANNOUNCEMENT" },
                { label: "System", value: "SYSTEM" },
                ]}
            />

            <InputField
                label="Title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter notification title"
            />

            <div className="md:col-span-2">
                <label className="block text-sm mb-1">Message</label>
                <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                className="w-full border rounded-md p-2 focus:ring-2 focus:ring-green-600 outline-none"
                placeholder="Enter message"
                />
            </div>

            <InputField
                label="Link (Optional)"
                name="link"
                value={form.link}
                onChange={handleChange}
                placeholder="https://example.com"
            />

            <InputField
                label="Attachment URL (Optional)"
                name="attachmentUrl"
                value={form.attachmentUrl}
                onChange={handleChange}
                placeholder="Attachment link"
            />

            </div>

        </Section>


    <FormActions submitLabel="Send Notification" loading={loading} onCancel={goBack}  submitType="button" onSubmit={handleSubmit}/>

        </div>
    );
}
