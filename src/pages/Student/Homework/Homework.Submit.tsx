import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { Attachment, IHomework } from "@/interfaces/IHomework";
import { useParams } from "react-router-dom";
import { StudentHomeworkService } from "@/api/Services/Student/studentHomeworkService";
import { useAppNavigate } from "@/hooks/useNavigate.hook";
import { HomeworkService } from "@/api/Services/Teacher/homework.service";
import HomeworkCard from "@/components/HomeworkCard";
import FormActions from "@/components/FormAction";
import { useAppSelector } from "@/hooks/useStoreHooks";


const HomeworkSubmissionPage = () => {
    const [homework,setHomework]=useState<IHomework>();
    const [note, setNote] = useState("");
    const [attachments, setAttachments] = useState<Attachment[]>([]);
    const [link, setLink] = useState("");
    const {homeworkId}=useParams();
    const {goBack} =useAppNavigate()
    const {user}=useAppSelector((state)=>state.currentUser);

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    const MAX_VIDEO_SIZE = 15 * 1024 * 1024; // 15MB

    const fetchStudentHomeworkInfo=async()=>{
        const res=await StudentHomeworkService.getById(homeworkId);

        if(!res.success){
            console.log(res.error.message);
            return res.success;
        }

        const homework=res.data?.data;

        setNote(homework.note);
        setLink(homework.links.join(" "));
        //setAttachments(homework?.attachments as IUploadedDoc[]);
    
        return res.success;
    }

    useEffect(()=>{
        const fetchHomeWork=async()=>{
            const res=await HomeworkService.getById(homeworkId);
            if(!res.success){
                toast.error(res.error.message);
                return res.success;
            }
            const hw=res.data?.data;
            setHomework(hw);
        }
        fetchHomeWork();
        fetchStudentHomeworkInfo();
    },[homeworkId]);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (!e.target.files) return;

        const files = Array.from(e.target.files);

        for (const file of files) {

        const isVideo = file.type.startsWith("video");

        if (isVideo && file.size > MAX_VIDEO_SIZE) {
            toast.error("Video must be under 15MB");
            return;
        }

        if (!isVideo && file.size > MAX_FILE_SIZE) {
            toast.error("File must be under 5MB");
            return;
        }

        setAttachments((prev) => [...prev, { file, type: file.type }]);
        }
    };

    const removeFile = (index: number) => {
        setAttachments((prev) => prev?.filter((_, i) => i !== index));
    };

    const handleSubmit = async() => {
        if(attachments.length<=0 || link.length<=0 || note.trim().length<=10){
            toast.warn('Not valid submission, Fill fields');
            return false
        }

        const formData = new FormData();

        formData.append("note", note);

        attachments.forEach((item) => {
        formData.append("docs", item.file);
        });

        if (link) {
        formData.append("link", link);
        }

        const res=await StudentHomeworkService.submit(formData,homeworkId);
        
        if(!res.success){
            toast.error(res.error?.message);
            return res.success;
        }

        toast.success('Home Submitted successfully');
        goBack();
        return res.success;
    };

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
            <h1 className="text-2xl font-semibold mb-6">
            Homework Details
            </h1>

            <HomeworkCard
                    title={homework?.title}
                    description={homework?.description}

                    attachments={homework?.attachments }

                    links={[]}
            />
        <br />
        <hr className="border border-green-700" />
        <br />  

        <h2 className="text-2xl font-semibold mb-6">
            Submit Homework
        </h2>

        {/* Note */}
        <div className="mb-6">

            <label className="block text-sm font-medium mb-2">
            Note
            </label>

            <textarea
            rows={10}
            cols={10}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full border border-green-700 rounded-md p-3"
            placeholder="Write notes about your homework, at least length of 10 ..."
            />

        </div>

        {/* File Upload */}
        <div className="mb-6">

            <label className="block text-sm font-medium mb-2">
            Attachments
            </label>

            <input
            type="file"
            multiple
            accept="image/*,audio/*,video/*,application/pdf"
            onChange={handleFileUpload}
            className="border border-green-700 p-2 rounded-md w-full"
            />

            <p className="text-xs text-gray-500 mt-1">
            Images, Audio, PDF ≤ 5MB • Videos ≤ 15MB
            </p>

        </div>

        {/* Link */}
        <div className="mb-6">

            <label className="block text-sm font-medium mb-2">
            Reference Link
            </label>

            <input
            type="url"
            placeholder="Paste reference link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full border border-green-700 rounded-md p-2"
            />

        </div>

        {/* Attachment List */}
        {attachments.length > 0 && (

            <div className="mb-6">

            <p className="font-medium mb-2">
                Uploaded Files
            </p>

            <ul className="space-y-2">
                    {attachments.map((item, index) => {

                        const preview = URL.createObjectURL(item.file);
                        const isImage = item.file.type.startsWith("image");

                        return (
                        <li
                            key={index}
                            className="flex items-center gap-4 bg-gray-100 px-3 py-2 rounded-md"
                        >

                            {/* Preview */}
                            {isImage && (
                            <img
                                src={preview}
                                alt={item.file.name}
                                className="w-12 h-12 object-cover rounded"
                            />
                            )}

                            {/* File details */}
                            <span className="flex-1">
                            {item.file.name} • {(item.file.size / 1024).toFixed(1)} KB
                            </span>

                            {/* Delete */}
                            <button
                            onClick={() => removeFile(index)}
                            className="text-red-500"
                            >
                            <Trash2 size={16} />
                            </button>

                        </li>
                        );
                    })}
                </ul>

            </div>

        )}

        {/* Buttons */}
        <FormActions
                submitLabel="Submit"
                onCancel={goBack}
                submitType="button"
                onSubmit={handleSubmit}
        />

        </div>
    );
};

export default HomeworkSubmissionPage;