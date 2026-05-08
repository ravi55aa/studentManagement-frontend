import { useNavigate } from 'react-router-dom';

export default function TopBar({ to }: { to: string }) {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(to)}
          className="bg-green-600 mr-5 text-white px-4 py-2 rounded-md text-sm"
        >
          Add New
        </button>
      </div>
    </>
  );
}
