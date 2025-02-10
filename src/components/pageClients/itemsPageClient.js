"use client";

import { useRouter, useSearchParams, useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { Grid, useMediaQuery, useTheme, styled } from "@mui/material";
import GridWrapper from "@/components/wrappers/GridWrapper";
import SortFilterComponent from "@/components/wrappers/sortFilterComponent";
import SortFilterComponentMobile from "@/components/wrappers/SortFilterComponentMobile";
import FilterWrapper from "@/components/wrappers/FilterWrapper";
import FilterDrawerMobile from "@/components/wrappers/FilterDrawerMobile";
import PaginationComponent from "@/components/paginationComponent/pagination";
import { usePathname } from "next/navigation";
import { debounce } from "lodash";

// Styled Components
const PageContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  maxWidth: "100vw",
  overflow: "hidden",
  backgroundColor: theme.palette.background.default, // Use theme for background
}));

const ContentContainer = styled("div")(({ theme, isMobileOrTablet }) => ({
  display: "flex",
  flexDirection: isMobileOrTablet ? "column" : "row",
  width: "90vw",
  marginRight: "5vw",
  marginLeft: "5vw",
  
  flexGrow: 1,
  padding: theme.spacing(2), // Use theme spacing
}));
const PageHeaderComp = styled("div")(({ theme, isMobileOrTablet }) => ({
  width: "100%",
  backgroundColor: theme.custom.banner,
  color:theme.custom.primaryButtonFontColor,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(2), // Use theme spacing
  fontSize:theme.typography.pxToRem(60),
  fontFamily:"aboreto"
}));



const MainContent = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  flexGrow: 1,
  gap: theme.spacing(2), // Use theme spacing for gaps
  
}));

export default function ItemsPageClient({
  ItemsData,
  initialFilters,
  initialPage,
  sizeFilterArr,
  allColors,
  userInput,
  accessToken,
}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));

  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState(initialFilters);
  const [itemsArr, setItemsArr] = useState(ItemsData?.data);
  const [page, setPage] = useState(initialPage);
  console.log("params in items",params,pathname)
  // Create query string from filters
  const createQueryString = useCallback((filters, page) => {
    const params = [];
    if (userInput) params.push(`userInput=${userInput}`);
    if (page) params.push(`page=${page}`);
    if (filters.gender) params.push(`gender=${filters.gender}`);
    if (filters.size?.length) params.push(`size=${filters.size.join(",")}`);
    if (filters.color?.length) params.push(`color=${filters.color.join(",")}`);
    if (filters?.price?.length) params.push(`price=${filters?.price?.join(",")}`);

    return params.join("&");
  }, []);

  // Debounced filter update
  const updateFilters = useCallback(
    debounce((newFilters, newPage = 1) => {
      const queryString = createQueryString(newFilters, newPage);
      router.push(`${pathname}?${queryString}`);
    }, 300),
    [pathname, createQueryString]
  );

  // Handle filter changes
  const onApplyFilters = (newFilters) => {
    setSelectedFilters(newFilters);
    setPage(1);
    updateFilters(newFilters, 1);
  };

  // Handle clear filters
  const onClearFilters = () => {
    setSelectedFilters({
      gender: "",
      size: [],
      color: [],
      price: [0, 1000000],
    });
    setPage(1);
    updateFilters(
      {
        gender: "",
        size: [],
        color: [],
        price: [0, 1000000],
      },
      1
    );
  };

  // Handle page changes
  const handlePageChange = (newPage) => {
    setPage(newPage);
    updateFilters(selectedFilters, newPage);
  };

  // Sync state with URL parameters
  useEffect(() => {
    setSelectedFilters(initialFilters);
    setPage(initialPage);
    setItemsArr(ItemsData?.data);
  }, [initialFilters, initialPage, ItemsData]);

  const cardName =  pathname.split("/")[(pathname.split("/")).length-1]
  console.log("cardName",cardName)

  return (
    <PageContainer>
     {cardName &&  <PageHeaderComp >{cardName?.toUpperCase()}</PageHeaderComp>}
      <ContentContainer isMobileOrTablet={isMobileOrTablet}>
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

        <MainContent>
          {isMobileOrTablet ? (
            <SortFilterComponentMobile
              setShowFilters={setShowFilters}
              sizeFilterArr={sizeFilterArr}
              allColors={allColors}
            />
          ) : (
            <SortFilterComponent setShowFilters={setShowFilters} />
          )}

          <GridWrapper
            itemsArr={itemsArr}
            type="Product"
            loading={ItemsData?.loading}
            accessToken={accessToken}
          />
          <PaginationComponent
            page={page}
            setPage={handlePageChange}
            totalPages={ItemsData?.totalPages}
          />
        </MainContent>
      </ContentContainer>
    </PageContainer>
  );
}