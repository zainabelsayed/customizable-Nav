/* eslint-disable @next/next/no-img-element */
import React from "react";

const SearchInput: React.FC = () => {
  return (
    <div className="bg-white px-2 rounded-full   gap-2 items-center w-full max-w-[450px] hidden lg:flex">
      <div className="bg-primary rounded-full w-9 h-9 flex items-center justify-center">
        <img src="/icons/search.svg" alt="search icon" className="h-4" />
      </div>
      <input
        type="text"
        placeholder="Search by name, job title, ..."
        className="px-2 py-3 rounded-full focus:outline-none placeholder:text-sm placeholder:text-gray-300"
      />
    </div>
  );
};

export default SearchInput;
