// import { io } from "socket.io-client";

// import { useState } from "react";
// import { toast } from "react-toastify";
// import { useAppSelector } from "@/hooks/storeHooks"; 
// import { handleApi } from "@/api/global.api";

// const socket = io("http://localhost:5000", {
//     auth: {
//         userId: currentUser._id,
//         role: currentUser.role,
//     },
// });

// socket.on("connect", () => {
//     console.log("Connected:", socket.id);
// });

// socket.on("notification:new", (data) => {
//     console.log("data",data);
// });



// export default function AddNotificationPage() {

//     const currentUser = useAppSelector(
//         (state) => state.auth.user
//     );

//     const teachers = useAppSelector(
//         (state) => state.teacher.teachers
//     );

//     const students = useAppSelector(
//         (state) => state.student.students
//     );

//     const [form, setForm] = useState({
//         type: "GENERAL",
//         title: "",
//         message: "",
//         link: "",
//         attachmentUrl: "",
//         recipientModel:
//         currentUser.role === "Admin"
//             ? "Teacher"
//             : "Student",
//         recipientIds: [] as string[],
//     });

//     const recipients =
//         form.recipientModel === "Teacher"
//         ? teachers
//         : students;

//     const handleChange = (
//         e: React.ChangeEvent<
//         HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//         >
//     ) => {
//         const { name, value } = e.target;
//         setForm((prev) => ({ ...prev, [name]: value }));
//     };

//     const toggleRecipient = (id: string) => {
//         setForm((prev) => {
//         const exists = prev.recipientIds.includes(id);

//         return {
//             ...prev,
//             recipientIds: exists
//             ? prev.recipientIds.filter(
//                 (r) => r !== id
//                 )
//             : [...prev.recipientIds, id],
//         };
//         });
//     };

//     const handleSubmit = async () => {

//         if (!form.title || !form.message) {
//         toast.error("Title & Message required");
//         return;
//         }

//         if (form.recipientIds.length === 0) {
//         toast.error("Select at least one recipient");
//         return;
//         }

//         const payload = {
//         type: form.type,
//         title: form.title,
//         message: form.message,
//         link: form.link || undefined,
//         attachmentUrl:
//             form.attachmentUrl || undefined,

//         sender: {
//             model: currentUser.role,
//             id: currentUser._id,
//         },

//         recipients: [
//             {
//             model: form.recipientModel,
//             ids: form.recipientIds,
//             },
//         ],
//         };

//         const res = await handleApi({
//         endPoint: "/notification",
//         method: "post",
//         payload,
//         });

//         if (!res.success) {
//         toast.error("Failed to send notification");
//         return;
//         }

//         toast.success("Notification sent");

//         setForm((prev) => ({
//         ...prev,
//         title: "",
//         message: "",
//         recipientIds: [],
//         }));
//     };

//     return ( 
//     <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6">

//         <h2 className="text-xl font-semibold">Send Notification</h2>

//         <div>
//             <label className="block text-sm mb-1">
//             Type
//             </label>
//             <select
//             name="type"
//             value={form.type}
//             onChange={handleChange}
//             className="w-full border rounded-md p-2"
//             >
//             <option value="GENERAL">
//                 General
//             </option>
//             <option value="ALERT">
//                 Alert
//             </option>
//             <option value="REMINDER">
//                 Reminder
//             </option>
//             </select>
//         </div>

//         <div>
//             <label className="block text-sm mb-1">
//             Title
//             </label>
//             <input
//             name="title"
//             value={form.title}
//             onChange={handleChange}
//             className="w-full border rounded-md p-2"
//             />
//         </div>


//         <div>
//             <label className="block text-sm mb-1">
//             Message
//             </label>
//             <textarea
//             name="message"
//             value={form.message}
//             onChange={handleChange}
//             rows={4}
//             className="w-full border rounded-md p-2"
//             />
//         </div>

//         <div>
//             <label className="block text-sm mb-1">
//             Link (optional)
//             </label>
//             <input
//             name="link"
//             value={form.link}
//             onChange={handleChange}
//             className="w-full border rounded-md p-2"
//             />
//         </div>


//         <div>
//             <p className="text-sm font-medium mb-2">
//             Select Recipients
//             </p>

//             <div className="border rounded-md p-3 max-h-48 overflow-y-auto space-y-2">

//             {recipients.map((user) => (
//                 <label
//                 key={user._id}
//                 className="flex items-center gap-2 text-sm"
//                 >
//                 <input
//                     type="checkbox"
//                     checked={form.recipientIds.includes(
//                     user._id
//                     )}
//                     onChange={() =>
//                     toggleRecipient(user._id)
//                     }
//                 />
//                 {user.firstName} {user.lastName}
//                 </label>
//             ))}
//             </div>
//         </div>

//         <div className="flex justify-end">
//             <button
//             onClick={handleSubmit}
//             className="bg-green-700 text-white px-6 py-2 rounded-md hover:bg-green-800"
//             >
//             Send
//             </button>
//         </div>

//         </div>
//     );
// }
