"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { formUrlQuery, removeKeysFromUrlQuery } from "@/lib/url";

const filters = [
  { name: "Newest", value: "newest" },
  { name: "Popular", value: "popular" },
  { name: "Unanswered", value: "unanswered" },
  { name: "Recommended", value: "recommended" },
];

const HomeFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterParams = searchParams.get("filter") || "";
  const [activeFilter, setActiveFilter] = useState(filterParams);

  const handleFilterChange = (filterValue: string) => {
    let newUrl = "";
    if (filterValue === activeFilter) {
      setActiveFilter("");
      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["filter"],
      });
    } else {
      setActiveFilter(filterValue);
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "filter",
        value: filterValue.toLowerCase(),
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="mt-10 hidden flex-wrap gap-3 sm:flex">
      {filters.map((filter) => (
        <Button
          key={filter.name}
          className={cn(
            `body-medium rounded-lg px-6 py-3 capitalize shadow-none`,
            activeFilter === filter.value
              ? "bg-primary-100 text-primary-500 hover:bg-primary-100 dark:bg-dark-400 dark:text-primary-500 dark:hover:bg-dark-400"
              : "bg-light-800 text-light-500 hover:bg-light-800 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-300"
          )}
          onClick={() => handleFilterChange(filter.value)}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilter;
