import { IBatches } from "@/interfaces/ISchool";
import { ITeacher } from "@/interfaces/ITeacher";

export default  function CheckList_for_Batches({
    label,
    name,
    batches,
    onChange,
    form,
    }: {
    label: string;
    name:string;
    batches: IBatches[];
    onChange: (batchId: string,key:string) => void;
    form: Partial<ITeacher>;
    }) {
    return (
        <div>
        <p className="text-sm font-medium mb-2">{label}</p>

        <div className="border rounded-md p-4 max-h-56 overflow-y-auto space-y-2 bg-gray-50">
            {batches.length <= 0 ? (
            <input
                readOnly
                type="text"
                placeholder="No Batch Data: could be fetch_err()"
                className="text-sm text-gray-500 bg-transparent"
            />
            ) : (
            batches.map((batch) => (
                <label
                key={batch.code}
                className="flex items-center gap-3 text-sm cursor-pointer"
                >
                <input
                    type="radio"
                    name={name}
                    value={batch.code}
                    checked={form.classTeacherOf === batch.code}
                    onChange={() => onChange(batch.code,"classTeacherOf")}
                    className="accent-green-700"
                />

                <span>
                    {batch.name}
                    <span className="text-gray-500 ml-1">
                    ({batch.code})
                    </span>
                </span>
                </label>
            ))
            )}
        </div>
        </div>
    );
}
