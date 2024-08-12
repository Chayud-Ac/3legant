"use client";

import React from "react";
import Filter from "../shared/Filter";
import { CategoryFilters } from "@/constant/filter";
import { priceFilters } from "@/constant/filter";
import { useState } from "react";
import SortDisplay from "../shared/SortDisplay";

const DisplayTemplate = () => {
  const [sort, setSort] = useState("grid-cols-4");
  console.log(sort);

  return (
    <section className="flex flex-col w-full container-1 max-w-[1440px] relative pt-10 pb-10 ">
      <div className="flex flex-col sm:flex-row justify-between w-full">
        <div className="flex flex-col sm:flex-row gap-5 w-full max-w-[548px]">
          <Filter
            title="CATEGORIES"
            filter={CategoryFilters}
            otherClasses="text-dark-1 medium-sm w-full"
            containerClasses="w-full flex-col gap-3"
          />
          <Filter
            title="PRICES"
            filter={priceFilters}
            otherClasses="text-dark-1 medium-sm w-full"
            containerClasses="w-full flex-col gap-3"
          />
        </div>
        <SortDisplay sort={sort} setSort={setSort} />
      </div>
    </section>
  );
};

export default DisplayTemplate;
