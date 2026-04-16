

type PreviewModalProps = {
    isOpen: boolean;
    onClose: () => void;
    url: string;
};

const getFileType = (url: string) => {
    if (!url) return "";

    const lowerUrl = url.toLowerCase();

    if (lowerUrl.match(/\.(jpeg|jpg|png|gif|webp)$/)) return "image";
    if (lowerUrl.match(/\.(mp4|webm|ogg)$/)) return "video";
    if (lowerUrl.match(/\.pdf$/)) return "pdf";

    return "unknown";
};

export default function PreviewModal({ isOpen, onClose, url }: PreviewModalProps) {
    if (!isOpen) return null;

    const type = getFileType(url);

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl w-[90%] max-w-4xl p-4 relative shadow-xl">

            {/* Close Button */}
            <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
            >
            ✕
            </button>

            {/* Content */}
            <div className="w-full h-[70vh] flex items-center justify-center">

            {type === "image" && (
                <img src={url} alt="preview" className="max-h-full rounded-lg" />
            )}

            {type === "video" && (
                <video
                src={url}
                controls
                className="max-h-full rounded-lg"
                />
            )}

            {type === "pdf" && (
                <iframe
                src={url}
                title="PDF Preview"
                className="w-full h-full rounded-lg"
                />
            )}

            {type === "unknown" && (
                <p className="text-gray-500">Unsupported file type</p>
            )}

            </div>
        </div>
        </div>
    );
}