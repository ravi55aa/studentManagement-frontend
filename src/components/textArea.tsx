export const Textarea = (
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string },
) => (
  <div>
    <label className="block text-sm font-medium mb-1">{props.label}</label>
    <textarea {...props} rows={3} className="w-full border rounded px-3 py-2 text-sm" />
    <span id={props.name} className="text-sm text-red-500 errorDisplay"></span>
  </div>
);
