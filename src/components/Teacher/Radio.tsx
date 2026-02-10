


function RadioGroup(
    { label, options, name, onChange }: 
    {label:string,options:unknown[],
        name:string,onChange:(
            e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
        )=>void}
    ) {
    return (
        <div>
        <p className="text-sm font-medium mb-2">{label}</p>
        <div className="flex gap-6">
            {options.map((o: string) => (
            <label key={o} className="flex gap-2 text-sm">
                <input type="radio" name={name} value={o} onChange={onChange} />
                {o}
            </label>
            ))}
        </div>
        </div>
    );
}

export default RadioGroup;