import { IAttachment } from "../HomeworkCard";

interface Props {
  file: File | IAttachment;
  index: number;
  removeAFile: (index: number) => void;
}

export default function DocumentRow({ file, index, removeAFile }: Props) {
  return (
    <div className="flex justify-between items-center border p-3 rounded-md">
      {file?.name
      ?
      <span className="text-sm truncate">{file?.name }</span>
      :
      <a href={file.url} className="text-sm truncate">{file?.fileName}</a>
      }
      

      <button onClick={() => removeAFile(index)} className="text-red-500 text-sm hover:underline">
        Remove
      </button>
    </div>
  );
}
