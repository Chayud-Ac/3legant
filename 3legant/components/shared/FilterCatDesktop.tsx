import React from "react";

interface FilterDesktopProps {
  title: string;
  filter: {
    name: string;
    value: string;
  }[];
}

const FilterCatDesktop = ({ title, filter }: FilterDesktopProps) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="medium-base text-dark-1">{title}</p>
      <div className="flex flex-col gap-3 h-[260px] overflow-y-scroll whitespace-nowrap scroll-smooth custom-scrollbar-2">
        {filter.map((item) => {
          const isActive = true; //!!TODO this will check if path query value equal to the filter value key to style the actice filter
          return (
            <p
              key={item.value}
              className={`${isActive ? "text-dark-1 underline underline-offset-[5px]" : "text-grey-2 "}  regular-base`}
            >
              {item.name}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default FilterCatDesktop;
