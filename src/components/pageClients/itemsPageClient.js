"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import GridWrapper from "@/components/wrappers/GridWrapper";
import SortFilterComponent from "@/components/wrappers/sortFilterComponent";
import SortFilterComponentMobile from "@/components/wrappers/SortFilterComponentMobile";
import FilterWrapper from "@/components/wrappers/FilterWrapper";
import FilterDrawerMobile from "@/components/wrappers/FilterDrawerMobile";
import PaginationComponent from "@/components/paginationComponent/pagination";
import { usePathname } from 'next/navigation';
import { debounce } from "lodash";

export default function ItemsPageClient({ ItemsData, initialFilters, initialPage, sizeFilterArr, allColors }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState(initialFilters);
  const [itemsArr, setItemsArr] = useState(ItemsData?.data);
  console.log("itemsArr",itemsArr?.data)
  const [page, setPage] = useState(initialPage);  // ✅ Fix: Declare page state

  // Create query string from filters
  const createQueryString = useCallback((filters, page) => {
    const params = [];

    if (page) params.push(`page=${page}`);
    if (filters.gender) params.push(`gender=${filters.gender}`);
    
    // Format size as [1,2]
    if (filters.size?.length)  params.push(`size=${filters.size.join(',')}`);
    
    if (filters.color?.length) params.push(`color=${filters.color.join(',')}`);
    if (filters?.price?.length) params.push(`price=${filters?.price?.join(',')}`);

    const queryString = params.join('&');
    console.log(queryString);
    return queryString;
}, []);


  // Debounced filter update
  const updateFilters = useCallback(debounce((newFilters, newPage = 1) => {
    const queryString = createQueryString(newFilters, newPage);
    router.push(`${pathname}?${queryString}`);
  }, 300), [pathname, createQueryString]);

  // Handle filter changes
  const onApplyFilters = (newFilters) => {
    setSelectedFilters(newFilters);
    setPage(1); // ✅ Fix: Reset page state
    updateFilters(newFilters, 1);
  };

  const onClearFilters= ()=>{
    setSelectedFilters( {
      gender:"",
      size: [],
      color:  [],
      price: [0, 1000000]
    });
    setPage(1); // ✅ Fix: Reset page state
    updateFilters({
      gender:"",
      size: [],
      color:  [],
      price: [0, 1000000]
    }, 1);
  }

  // Handle page changes
  const handlePageChange = (newPage) => {
    setPage(newPage); // ✅ Fix: Update page state
    updateFilters(selectedFilters, newPage);
  };

  // Sync state with URL parameters
  useEffect(() => {
    setSelectedFilters(initialFilters);
    setPage(initialPage);  // ✅ Fix: Set page from initialPage
    setItemsArr(ItemsData?.data);
  }, [initialFilters, initialPage, ItemsData]);

  return (
    <div style={{ display: "flex", flexDirection: "column", maxWidth: "100vw", maxHeight: "100vh", overflow: "hidden" }}>
      <div style={{ display: "flex", flexDirection: isMobileOrTablet ? "column" : "row", width: "100%", maxWidth: "99%", flexGrow: 1, overflow: "auto" }}>
        {isMobileOrTablet ? (
          <FilterDrawerMobile
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            setShowFilters={setShowFilters}
            showFilters={showFilters}
            sizeFilterArr={sizeFilterArr}
            allColors={allColors}
            onApplyFilters={onApplyFilters}
            onClearFilters={onClearFilters}
          />
        ) : (
          <FilterWrapper 
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            sizeFilterArr={sizeFilterArr}
            allColors={allColors}
            onApplyFilters={onApplyFilters}
            onClearFilters={onClearFilters}
          />
        )}

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", flexGrow: 1 }}>
          {isMobileOrTablet ? (
            <SortFilterComponentMobile 
              setShowFilters={setShowFilters} 
              sizeFilterArr={sizeFilterArr} 
              allColors={allColors}
            />
          ) : (
            <SortFilterComponent setShowFilters={setShowFilters} />
          )}
        
          <GridWrapper itemsArr={itemsArr} type="Product" loading={ItemsData?.loading}/>
          <PaginationComponent 
            page={page} 
            setPage={handlePageChange} 
            totalPages={ItemsData?.totalPages} 
          />
        </div>
      </div>
    </div>
  );
}
