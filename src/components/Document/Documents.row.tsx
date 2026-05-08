import React from "react";
import { IAttachment } from "../HomeworkCard";
import PreviewModal from "../PreviewModa";
import { Trash2 } from "lucide-react";


interface Props {
  file: File | IAttachment;
  index: number;
  removeAFile: (index: number) => void;
}

export default function DocumentRow({ file, index, removeAFile }: Props) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="flex justify-between items-center border p-3 rounded-md">
      {file?.name
      ?
      <span className="text-sm truncate">{file?.name }</span>
      :
      <button onClick={() => setIsOpen(true)} className="text-sm truncate mr-1">
        {file?.fileName}
      </button>
      }
      

      <button onClick={() => removeAFile(index)} className="text-red-500 text-sm hover:underline">
        <Trash2 className="h-4 w-4" />
      </button>

      {isOpen && 
      <PreviewModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        url={file?.url || ""} />}

    </div>
  );
}
