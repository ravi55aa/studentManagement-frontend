export default function Pagination() {

  const totalPages = 1; // This should be dynamically calculated based on the total items and items per page
  const currentPage = 1; // This should be dynamically set based on user interaction

  return (
    <div className="flex justify-center items-center gap-4 mt-6 text-sm">
      <button className="px-3 py-1 border rounded-md">←</button>
      <span>Page {currentPage} of {totalPages}</span>
      <button className="px-3 py-1 border rounded-md">→</button>
    </div>
  );
}
