type paginationPropTypes={
  pagination:{
    page:number,
    totalPages:number,
    total:number
  },
  onLeftClick?:()=>void,
  onRightClick?:()=>void
}

export default function Pagination(
      {pagination,onLeftClick,onRightClick}:paginationPropTypes
) {

  return (
    <div className="flex justify-center items-center gap-4 mt-6 text-sm">
      <button className="px-3 py-1 border rounded-md" onClick={onLeftClick}>
        ←
      </button>
      <span>Page {pagination.page} of {pagination.    totalPages || 1}</span>
      <button className="px-3 py-1 border rounded-md" onClick={onRightClick}>
        →
      </button>
    </div>
  );
}
