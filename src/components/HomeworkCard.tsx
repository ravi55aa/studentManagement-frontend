import { Paperclip, Link2 } from "lucide-react";

export interface IAttachment {
    url: string;
    fileName: string;
}

interface HomeworkCardProps {
    title: string;
    description: string;
    attachments?: IAttachment[];
    links?: string[];
}

export default function HomeworkCard({
    title,
    description,
    attachments = [],
    links = [],
}: HomeworkCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-md p-5 border border-gray-100 hover:shadow-lg transition">

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
            {title}
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4">
            {description}
        </p>

        {/* Attachments */}
        {attachments.length > 0 && (
            <div className="mb-3">
            <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
                <Paperclip size={16} />
                Attachments
            </h3>

            <div className="flex flex-wrap gap-2">
                {attachments.map((file, index) => (
                <a
                    key={index}
                    href={file.url}
                    target="_blank"
                    className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md text-gray-700"
                >
                    {file.fileName}
                </a>
                ))}
            </div>
            </div>
        )}

        {/* Links */}
        {links.length > 0 && (
            <div>
            <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-1">
                <Link2 size={16} />
                Links
            </h3>

            <ul className="list-disc list-inside text-sm text-blue-600">
                {links.map((link, index) => (
                <li key={index}>
                    <a href={link} target="_blank" className="hover:underline">
                    {link}
                    </a>
                </li>
                ))}
            </ul>
            </div>
        )}
        </div>
    );
}