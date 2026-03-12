import { Link } from 'react-router-dom';

const ActionBtn = ({ label, path }: { path: string; label: string}) => (
  <Link to={path}>
    <button className="px-3 py-1 rounded-md bg-gray-200 text-xs hover:bg-gray-300">{label}</button>
  </Link>
);

export default ActionBtn;
