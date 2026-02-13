import { ReactNode } from "react";

export interface GridProps {
    children: ReactNode;
}

export const Grid = ({ children }: GridProps) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{children}</div>
);


export function FileUpload({ label, ...props }) {
    return (
        <div>
        <p className="text-sm font-medium mb-1">{label}</p>
        <input type="file" {...props} />
        </div>
    );
}


export const ActionBar = ({ children }:GridProps) => (
    <div className="flex justify-end mt-6">{children}</div>
);

