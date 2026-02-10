import { IDepartment_obj } from "@/interfaces/Idepartment";




export default function CheckboxList(
    { label, items,name,onChange }: 
    {label:string,
        items:IDepartment_obj,
        name:string,
        onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void
    }
    ) {
    return (
        <div>
        <p className="text-sm font-medium mb-2">{label}</p>
        <div className="grid grid-cols-2 gap-2">
            {Object.keys(items)?.map((item,index) => (
            <label key={index} htmlFor={label} className="flex gap-2 text-sm">
                <input onChange={onChange} name={item} type="checkbox" />
                {item}
            </label>
            ))}
        </div>
        <span id={name} className="text-red-500 text-sm errorDisplay"></span>
        </div>
    );
}