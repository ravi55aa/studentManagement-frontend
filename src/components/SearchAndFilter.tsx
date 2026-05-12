import { Search, SlidersHorizontal } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import React, { useState } from "react";


interface IProps{
  filterField:string,
  filterValues: {name:string,value:string}[] ,
  
  searchField:string,

  placeHolder:string,

  setSearchQuery: React.Dispatch<
    React.SetStateAction<Record<string, string | number>>
  >;
}

const SearchAndFilter = (props:IProps) => {

  const {debounce} = useDebounce();
  const [filterValues,setFilterValues]=useState<Record<string,string|number>>({});

  const handleOnChange=(e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement>)=>{
    const {name,value} = e.target;
    
    setFilterValues((prev)=>({...prev,[name]:value}));

    return;
  }

  const handleSearch = () => {
    const formattedQuery = {
      ...filterValues,

      // convert search field into regex search format
      [props.searchField]: filterValues[props.searchField]
        ? {
            $regex: filterValues[props.searchField],
            $options: "i",
          }
        : undefined,
    };

    // remove empty/undefined values
    const cleanedQuery = Object.fromEntries(
      Object.entries(formattedQuery).filter(
        ([_, value]) =>
          value !== undefined &&
          value !== null &&
          value !== ""
      )
    );

    props.setSearchQuery(
      cleanedQuery as Record<string, string | number>
    );

    return;
  };

  return (
    <div className="mb-6">

      <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center rounded-[26px] border border-slate-200 bg-white px-4 md:px-5 py-4 shadow-[0px_8px_30px_rgba(15,23,42,0.05)]">

        {/* Filter Section */}
        <div className="flex items-center gap-3">

          {/* Icon */}
          <div className="hidden md:flex h-12 w-12 rounded-2xl bg-indigo-50 items-center justify-center border border-indigo-100">
            <SlidersHorizontal className="w-5 h-5 text-green-800" />
          </div>

          {/* Select */}
          <div className="relative min-w-[180px]">

            <select
              name={props?.filterField}
              onChange={handleOnChange}
              value={filterValues[props?.filterField]||''}
              className="
                w-full
                appearance-none
                rounded-2xl
                border border-slate-200
                bg-slate-50/70
                px-4 py-3
                pr-10
                text-sm font-medium text-slate-700
                outline-none
                transition-all duration-200
                focus:border-indigo-300
                focus:ring-4 focus:ring-indigo-100
                hover:bg-slate-50
              "
            >
              <option value='' >Add Filter</option>
              { props?.filterValues && props?.filterValues?.map((val)=>
              <option value={val?.value} >{val.name?.toUpperCase()}</option>
              )}
            </select>

            {/* Custom Arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-slate-400">
              ▼
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden lg:block h-10 w-px bg-slate-200" />

        {/* Search Input */}
        <div className="relative flex-1">

          {/* Search Icon */}
          <div className="absolute inset-y-0 left-4 flex items-center text-slate-400">
            <Search className="w-5 h-5" />
          </div>

          <input
            type="text"
            value={filterValues[props?.searchField]}
            name={props.searchField}
            onChange={handleOnChange}
            placeholder={props.placeHolder+'....'}
            className="
              w-full
              rounded-2xl
              border border-slate-200
              bg-slate-50/70
              py-3 pl-12 pr-4
              text-sm text-slate-700
              placeholder:text-slate-400
              outline-none
              transition-all duration-200
              focus:border-indigo-300
              focus:ring-4 focus:ring-indigo-100
              hover:bg-slate-50
            "
          />
        </div>

        {/* Optional Action */}
        <button
          onClick={()=>debounce(handleSearch)}
          className="
            rounded-2xl
            bg-linear-to-r
            from-green-600
            to-green-500
            px-6 py-3
            text-sm font-semibold text-white
            shadow-md
            transition-all duration-300
            hover:scale-[1.02]
            hover:shadow-lg
            active:scale-[0.98]
          "
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchAndFilter;
