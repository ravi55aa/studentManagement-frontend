interface Props {
  file: File;
  index: number;
  removeFile: (index: number) => void;
}

export default function DocumentRow({
    file,
    index,
    removeFile,
}: Props) {
    return (
        <div className="flex justify-between items-center border p-3 rounded-md">
        <span className="text-sm truncate">
            {file.name}
        </span>

        <button
            onClick={() => removeFile(index)}
            className="text-red-500 text-sm hover:underline"
        >
            Remove
        </button>
        </div>
    );
}
