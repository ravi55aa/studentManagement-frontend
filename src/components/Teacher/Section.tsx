import { ReactNode } from "react";

export function Section({ title, children }: {title:string,children:ReactNode}) {
    return (
    
        <div className="border rounded-lg p-6 shadow-sm space-y-6">
            <h2 className="text-lg font-semibold">{title}</h2>
            {children}
        </div>
    );
}
