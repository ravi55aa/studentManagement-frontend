type paginationPropTypes={
  page:number,
  totalPages:number,
  total:number,
  onLeftClick?:()=>void,
  onRightClick?:()=>void
}

export default function Pagination(
      {page,totalPages,total,onLeftClick,onRightClick}:paginationPropTypes
) {

  return (
    <div className="flex justify-center items-center gap-4 mt-6 text-sm">
      <button className="px-3 py-1 border rounded-md" onClick={onLeftClick}>
        ←
      </button>
      <span>Page {page} of {totalPages}</span>
      <button className="px-3 py-1 border rounded-md" onClick={onRightClick}>
        →
      </button>
    </div>
  );
}
