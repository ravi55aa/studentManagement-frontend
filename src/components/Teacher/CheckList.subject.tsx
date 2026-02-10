import { IAcademicSubject } from "@/interfaces/ISchool"
import { ITeacher } from "@/interfaces/ITeacher"

export default function CheckList_for_Subjects(
    {
        label,
        subjects,onChange,form } : 
    {
        label:string,
        subjects:IAcademicSubject[],
        onChange:(batchId:string)=>void,
        form:Partial<ITeacher>
    }
    ) {

    return(
        <div>
        <p className="text-sm font-medium mb-2">{label}</p>
        <div className="border rounded-md p-4 max-h-56 overflow-y-auto space-y-2 bg-gray-50">
                        {subjects.length<=0 ?
                        <input readOnly type="text" placeholder="No Batch Data: could be fetch_err()"/>
                        :
                        subjects?.map((subject) => (
                        <label
                            key={subject?.code}
                            className="flex items-center gap-3 text-sm cursor-pointer"
                        >
                            <input
                            type="checkbox"
                            checked={form.assignedSubjects.includes(subject.code)}
                            onChange={() => onChange(subject.code)}
                            className="accent-green-700"
                            />
                            <span>
                            {subject?.name}
                            <span className="text-gray-500 ml-1">
                                ({subject?.code})
                            </span>
                            </span>
                            
                        </label>
                ))}
        </div>
        </div>)
}
