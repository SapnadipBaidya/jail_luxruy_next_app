import LoadingAnimation from "@/components/loaders/LoadingAnimation";
import ItemsPageClient from "@/components/pageClients/itemsPageClient";
import { makeGetAPIcall, makePostAPIcall } from "@/utils/API_vendor";
import { Suspense } from 'react'

// Separate data fetching components
async function ItemsPageContent({ params, searchParams }) {
  const category = await params?.category || "default-category";
  const userInput = await searchParams?.userInput || "";
  const page = parseInt( await searchParams?.page) || 1;
  const color = await  searchParams?.color || "";
  const size = await  searchParams?.size || "";
  const gender = await  searchParams?.gender || "";
  console.log("searchParams",page,color,size,gender ,"params",category)
  // Fetch data in parallel where possible
  const [ItemsData, allSizesPerCategory, allColors] = await Promise.all([
    category === "search" ? fetchSearchItemsFromAPI(userInput,page) : fetchItemsFromAPI(category, page, color, size, gender),
    fetchSizeFilterByCategoryName(category),
    fetchAllColors(),
]);

  const initialFilters = {
    gender: searchParams.gender || "",
    size: searchParams.size ? searchParams.size.split(',').map(Number) : [],
    color: searchParams.color ? searchParams.color.split(',').map(Number) : [],
    price: searchParams.price ? searchParams.price.split(',').map(Number) : [0, 1000000]
  };

  return (
    <ItemsPageClient
      ItemsData={ItemsData}
      initialFilters={initialFilters}
      initialPage={page}
      category={category}
      sizeFilterArr={allSizesPerCategory}
      allColors={allColors}
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

export default function ItemsPage({ params, searchParams }) {
  const page = parseInt(searchParams?.page) || 1;
  return (
    <ErrorBoundary>
      <Suspense key={page} fallback={<LoadingAnimation />}>
        <ItemsPageContent params={params} searchParams={searchParams} />
      </Suspense>
    </ErrorBoundary>
  );
}

// Move data fetching functions here
async function fetchItemsFromAPI(category, page,colors,sizes,gender) {
  const apiUrl = `http://localhost:8080/api/products/findProductsByCategoryName?categoryName=${category}&colorFilter=${colors}&sizeFilter=${sizes}&gender=${gender}&sortBy=product_price_local&sortOrder=ASC&limit=12&page=${page}`;
  console.log("apiUrl",apiUrl)
  const response = await makeGetAPIcall(apiUrl);
  return { loading: false, data: response?.data || [] };
}

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
  const payload = { categoryName };
  const response = await makePostAPIcall(apiUrl, payload);
  return response?.data || [];
}