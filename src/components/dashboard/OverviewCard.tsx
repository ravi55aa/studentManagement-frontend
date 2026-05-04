import { ReactNode } from "react";
import clsx from "clsx";

interface Props {
  title: string;
  value: string | number;
  icon?: ReactNode;
  children?: ReactNode; // for chart / indicator
}

const OverviewCard = ({ title, value, icon, children }: Props) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm p-5 border border-green-100 hover:shadow-md transition">
        <div className="flex justify-between items-center mb-3">
            <h4 className="text-gray-600 text-sm font-medium">{title}</h4>
            {icon}
        </div>

        <h2 className="text-2xl font-bold text-green-700 mb-2">{value}</h2>

        {children && <div className="mt-2">{children}</div>}
        </div>
    );
};

export default OverviewCard;