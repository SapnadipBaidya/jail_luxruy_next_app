"use client"
import React, { useEffect, useState, useCallback } from "react";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import GridWrapper from "@/components/wrappers/GridWrapper";
import SortFilterComponent from "@/components/wrappers/sortFilterComponent";
import SortFilterComponentMobile from "@/components/wrappers/SortFilterComponentMobile";
import FilterWrapper from "@/components/wrappers/FilterWrapper";
import FilterDrawerMobile from "@/components/wrappers/FilterDrawerMobile";
import PaginationComponent from "@/components/paginationComponent/pagination";

function ItemsPage({ initialItems, initialFilters }) {
  const user  = {id:"111",name:"sapnadip"}
  const theme = useTheme();

  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [currentFilterData, setCurrentFilterData] = useState(initialFilters);
  const [selectedFilters, setSelectedFilters] = useState(initialFilters);
  const [itemsArr, setItemsArr] = useState(initialItems);

  const onClearFilters = () => {
    const defaultFilters = {
      gender: "",
      size: [],
      color: [],
      price: [0, 1000000],
    };
    setSelectedFilters(defaultFilters);
    setCurrentFilterData(defaultFilters);

    const payload = {
      productFilters: {
        fk_category_id: categoryId,
        priceStart: 0,
        priceEnd: 1000000,
        sizes: [],
        colors: [],
      },
      defaultFlag: 1,
      page,
      userId: user?.id,
    };

    // Fetch items with default filters
    fetchItems(defaultFilters);
  };

  const onApplyFilters = (filters) => {
    setCurrentFilterData(filters);
    fetchItems(filters);
  };

  const fetchItems = async (filters) => {
    // Fetch items based on filters
    // This function should make an API call to get the filtered items
    // and update the `itemsArr` state.
  };

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    maxWidth: "100vw",
    maxHeight: "100vh",
    overflow: "hidden"
  };

  return (
    <div style={containerStyle}>
      {/* 🔄 Main Content Container */}
      <div
        style={{
          display: "flex",
          flexDirection: isMobileOrTablet ? "column" : "row",
          justifyContent: "center",
          alignItems: "flex-start",
          width: "100%",
          maxWidth: "99%",
          flexGrow: 1,
          overflow: "auto"
        }}
      >
        {/* 🔹 Desktop View: Show Both Filter & Grid */}

        {isMobileOrTablet ? (
          <FilterDrawerMobile
            onApplyFilters={onApplyFilters}
            onClearFilters={onClearFilters}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            setShowFilters={setShowFilters}
            showFilters={showFilters}
          />
        ) : (
          <FilterWrapper
            onApplyFilters={onApplyFilters}
            onClearFilters={onClearFilters}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            flexGrow: 1
          }}
        >
          {isMobileOrTablet ? (
            <SortFilterComponentMobile
              setShowFilters={setShowFilters}
              showFilters={showFilters}
            />
          ) : (
            <SortFilterComponent
              setShowFilters={setShowFilters}
              showFilters={showFilters}
            />
          )}
          <GridWrapper
            itemsArr={itemsArr}
            type="Product"
            setShowFilters={setShowFilters}
            showFilters={showFilters}
            page={page}
            setPage={setPage}
          />

          {/* 🔹 Pagination Always Under GridWrapper */}
          <PaginationComponent page={page} setPage={setPage} />
        </div>
      </div>
    </div>
  );
}

export default ItemsPage;