function RadioGroup({
  label,
  options,
  name,
  onChange,
}: {
  label: string;
  options: unknown[];
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}) {
  return (
    <div className="border p-2 border-gray-300">
      <p className="text-sm font-medium mb-2 underline">{label}</p>
      <div className="grid grid-cols-3 gap-6">
        {options.map((o: string) => (
          <label key={o} className="capitalize flex gap-2 text-sm">
            <input type="radio" name={name} value={o} onChange={onChange} />
            {o}
          </label>
        ))}
      </div>
    </div>
  );
}

export default RadioGroup;
