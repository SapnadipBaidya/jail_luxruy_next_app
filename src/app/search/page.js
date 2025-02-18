export const runtime = 'edge';
import LoadingAnimation from "@/components/loaders/LoadingAnimation";
import ItemsPageClient from "@/components/pageClients/itemsPageClient";
import { makeGetAPIcall, makePostAPIcall } from "@/utils/API_vendor";
import { Suspense } from 'react'

// Separate data fetching components
async function SearchPageContent({ params, searchParams }) {

  const waitedSearchParams = await searchParams

  // Fetch data in parallel where possible
  const [ItemsData, allSizesPerCategory, allColors] = await Promise.all([
    fetchSearchItemsFromAPI(waitedSearchParams?.userInput,waitedSearchParams?.page),
    fetchSizeFilterByCategoryName(waitedSearchParams?.userInput),
    fetchAllColors(),
]);
const sortOrder = waitedSearchParams?.sortOrder || "";
const sortConfigArr = [
  { label: "None", value: "Sort By" },
  { label: "Price: Low to High", value: "Price: Low to High" , dbValue:"product_price_local" , dbSort : "ASC" },
  { label: "Price: High to Low", value: "Price: High to Low" , dbValue:"product_price_local" , dbSort : "DESC" },
]

const sortConfig = sortConfigArr.find((item)=>item?.dbValue==waitedSearchParams?.sortBy && item?.dbSort == waitedSearchParams?.sortOrder)
const sortBy = sortConfig?.value

  const initialFilters = {
    gender: waitedSearchParams.gender || "",
    size:   waitedSearchParams.size ? waitedSearchParams.size.split(',').map(Number) : [],
    color:  waitedSearchParams.color ? waitedSearchParams.color.split(',').map(Number) : [],
    price:  waitedSearchParams.price ? waitedSearchParams.price.split(',').map(Number) : [0, 1000000]
  };

  return (
    <ItemsPageClient
      ItemsData={ItemsData}
      initialFilters={initialFilters}
      initialPage={waitedSearchParams?.page}
      category={waitedSearchParams?.category}
      sizeFilterArr={allSizesPerCategory}
      allColors={allColors}
      userInput={waitedSearchParams?.userInput}
      initialSortBy={sortBy}
      initialSortOrder={sortOrder}
      sortConfigArr={sortConfigArr}
    />
  );
}

// Error boundary component (simplified example)
function ErrorBoundary({ children }) {
  try {
    return children;
  } catch (error) {
    return <div>Error loading content. Please try again later.</div>;
  }
}

export default async function ItemsPage({ params, searchParams }) {
  const waitedSearchParams = await searchParams;
  const page = parseInt(waitedSearchParams?.page) || 1;
  return (
    <ErrorBoundary>
      <Suspense key={page} fallback={<LoadingAnimation />}>
        <SearchPageContent params={params} searchParams={searchParams} />
      </Suspense>
    </ErrorBoundary>
  );
}

// Move data fetching functions here

async function fetchSearchItemsFromAPI(userInput,page) {
  console.log("fetchSearchItemsFromAPI",userInput,page)
  const apiUrl = `http://localhost:8080/api/products/searchByNameColorCategory?userInput=${userInput}&limit=12&page=${page}`;
  console.log("apiUrl",apiUrl)
  const response = await makeGetAPIcall(apiUrl);
  console.log("response",response.data)
  return { loading: false, data: response?.data || [] };
}


async function fetchAllColors() {
  const apiUrl = `http://localhost:8080/api/filters/getAllColors`;
  const response = await makeGetAPIcall(apiUrl);
  return response.data || [];
}

async function fetchSizeFilterByCategoryName(categoryName) {
  const apiUrl = `http://localhost:8080/api/filters/getSizeFilterByCatagory`;
  const payload = { categoryName  };
  const response = await makePostAPIcall(apiUrl, payload||"");
  return response?.data || [];
}