import { useState } from "react";
import Modal from "./Modal";
import DocumentRow from "./Documents.row";

interface Props {
    open: boolean;
    onClose: () => void;
    onUpload: (files: File[]) => void;
}

export default function DocumentUploadModal({
    open,
    onClose,
    onUpload,
    }: Props) {

    const [files, setFiles] = useState<File[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSelectFiles = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (!e.target.files) return;

        setFiles((prev) => [
        ...prev,
        ...Array.from(e.target.files),
        ]);
    };

    const removeFile = (index: number) => {
        setFiles((prev) =>
        prev.filter((_, i) => i !== index)
        );
    };

    const handleUpload = async () => {
        setLoading(true);
        await onUpload(files);
        setLoading(false);
        setFiles([]);
        onClose();
    };

    const handleCancel = () => {
        setFiles([]);
        setLoading(false);
        onClose();
    };

    return (
        <Modal
        open={open}
        title="Upload Documents"
        onClose={handleCancel}
        >
        {/* Upload button */}
        <label className="inline-block mb-4">
            <input
            type="file"
            multiple
            accept="image/*,.pdf"
            onChange={handleSelectFiles}
            hidden
            />

            <span className="px-4 py-2 bg-green-700 text-white rounded cursor-pointer">
            Upload Documents
            </span>
        </label>

        {/* Uploaded list */}
        <div className="space-y-3 max-h-64 overflow-auto">
            {files.length === 0 ? (
            <p className="text-sm text-gray-500">
                No documents selected
            </p>
            ) : (
            files.map((file, index) => (
                <DocumentRow
                key={index}
                file={file}
                index={index}
                removeFile={removeFile}
                />
            ))
            )}
        </div>

        {/* Footer buttons */}
        <div className="flex justify-end gap-3 mt-6">
            <button
            onClick={handleCancel}
            className="px-4 py-2 border rounded"
            >
            Cancel
            </button>

            <button
            onClick={handleUpload}
            disabled={files.length === 0}
            className="px-4 py-2 bg-green-700 text-white rounded disabled:opacity-40"
            >
            {loading ? "Uploading...." : "Upload"}
            </button>
        </div>
        </Modal>
    );
}
