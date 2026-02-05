import React, { useState } 
    from "react";
import { handleDocsUploadCreateSchoolApi } 
    from "@/api/school.api";
import { useNavigate } 
    from "react-router-dom";




export default function UploadDocuments() {

    const [docs, setDocs] = useState<File[]>([]);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const navigate=useNavigate();


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const fileArray = Array.from(files);

        //  validation 
        const invalid = fileArray.find(
        (file) => file.size > 3 * 1024 * 1024 // 3MB limit
        );

        if (invalid) {
        setError("File size must be less than 3 MB");
        return;
        }

        setDocs((prev) => [...prev, ...fileArray]);
        setError("");
    };


    const removeFile = (index: number) => {
        setDocs((prev) => prev.filter((_, i) => i !== index));
    };


    
    const handleOnSubmit = 
            async(e: React.MouseEvent<HTMLElement>) => {
                setLoading(true);
                e.preventDefault();
                
                //validation pending
                const formData=new FormData();

                docs.forEach((file)=>{
                    formData.append("docs",file);
                });

                const res = 
                    await handleDocsUploadCreateSchoolApi(formData);
                
                setLoading(false);

                if(!res.success){ return res.success; }
                
                navigate("/school/dashboard");
                return res.success;
    }



    return (
        <div className="flex justify-center items-center min-h-screen bg-white px-4">
        <div className="w-full max-w-xl">

            {/* Heading */}
            <h1 className="text-3xl font-bold text-center mb-2">
            Upload Documents
            </h1>
            <p className="text-gray-500 text-center mb-10">
            Please upload the required school documents.
            </p>

            {/* Upload Box */}
            <div className="flex flex-col gap-6">

            <div>
                <label className="block text-gray-600 mb-2 font-medium">
                Upload Documents (PDF / Image)
                </label>

                <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                multiple
                onChange={handleFileChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none"
                />

                {/* Error Message */}
                {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
            </div>

            {/* Uploaded Files List */}
            {docs.length > 0 && (
                <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
                <h3 className="text-gray-700 font-semibold mb-3">Uploaded Files</h3>

                <ul className="space-y-2">
                    {docs.map((file, index) => (
                    <li
                        key={index}
                        className="flex justify-between items-center bg-white p-2 rounded border"
                    >
                        <span className="text-gray-700">{file.name}</span>

                        <button
                        onClick={() => removeFile(index)}
                        className="text-red-500 text-sm font-medium hover:underline"
                        >
                        Remove
                        </button>
                    </li>
                    ))}
                </ul>
                </div>
            )}

            {/* Next Button */}
            <button onClick={handleOnSubmit} className="w-full bg-[#05A845] text-white font-semibold py-3 rounded-md mt-4 hover:bg-green-700">
                {loading ? "Uploading..." :"Complete"}
            </button>
            </div>
        </div>
        </div>
    );
}
























