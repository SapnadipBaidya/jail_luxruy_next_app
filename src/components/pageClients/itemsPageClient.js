"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import GridWrapper from "@/components/wrappers/GridWrapper";
import SortFilterComponent from "@/components/wrappers/sortFilterComponent";
import SortFilterComponentMobile from "@/components/wrappers/SortFilterComponentMobile";
import FilterWrapper from "@/components/wrappers/FilterWrapper";
import FilterDrawerMobile from "@/components/wrappers/FilterDrawerMobile";
import PaginationComponent from "@/components/paginationComponent/pagination";

export default function ItemsPageClient({ initialItems, initialFilters, initialPage }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(initialPage);
  const [currentFilterData, setCurrentFilterData] = useState(initialFilters);
  const [selectedFilters, setSelectedFilters] = useState(initialFilters);
  const [itemsArr, setItemsArr] = useState(initialItems);

  useEffect(() => {
    setItemsArr(initialItems); // Update items when SSR data changes
  }, [initialItems]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    router.push(`/items?page=${newPage}`); // Updates URL without full reload
  };
console.log("itemsArr",itemsArr)
  return (
    <div style={{ display: "flex", flexDirection: "column", maxWidth: "100vw", maxHeight: "100vh", overflow: "hidden" }}>
      <div style={{ display: "flex", flexDirection: isMobileOrTablet ? "column" : "row", width: "100%", maxWidth: "99%", flexGrow: 1, overflow: "auto" }}>
        {/* {isMobileOrTablet ? (
          <FilterDrawerMobile
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            setShowFilters={setShowFilters}
            showFilters={showFilters}
          />
        ) : (
          <FilterWrapper selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
        )} */}

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", flexGrow: 1 }}>
          {/* {isMobileOrTablet ? <SortFilterComponentMobile setShowFilters={setShowFilters} /> : <SortFilterComponent setShowFilters={setShowFilters} />} */}
          <GridWrapper itemsArr={itemsArr} type="Product" />
          {/* <PaginationComponent page={page} setPage={handlePageChange} /> */}
        </div>
      </div>
    </div>
  );
}
