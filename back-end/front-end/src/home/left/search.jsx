import React from "react";
import { FaSearch } from "react-icons/fa";

const search = ({value}) => {
  console.log("i am search")
  const {searchword , setsearchword} = value
  return (
    <div className="flex gap-3 justify-around items-center p-3 h-[10vh]">
      <label className="input input-bordered w-[88%] flex items-center gap-2">
        <input type="text" value={searchword} onChange={(e)=>setsearchword(e.target.value)} className="grow w-full  text-white" placeholder="Search" />
      </label>
      <div className="w-[20%]">
      <FaSearch className="text-white text-[35px] hover:bg-gray-600" />
      </div>
    </div>
  );
};

export default search;
