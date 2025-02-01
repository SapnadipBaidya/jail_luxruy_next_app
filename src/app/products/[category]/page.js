import LoadingAnimation from "@/components/loaders/LoadingAnimation";
import ItemsPageClient from "@/components/pageClients/itemsPageClient";
import { makeGetAPIcall, makePostAPIcall } from "@/utils/API_vendor";
import { Suspense } from 'react'

// Separate data fetching components
async function ItemsPageContent({ params, searchParams }) {
  const waitedParams = await params;
  const waitedSearchParams = await searchParams;
  const category = waitedParams?.category || "default-category";
  const userInput = waitedSearchParams?.userInput || "";
  const page = parseInt( waitedSearchParams?.page) || 1;
  const color = waitedSearchParams?.color || "";
  const size = waitedSearchParams?.size || "";
  const gender = waitedSearchParams?.gender || "";
  console.log("searchParams",page,color,size,gender ,"params",category)
  // Fetch data in parallel where possible
  const [ItemsData, allSizesPerCategory, allColors] = await Promise.all([
    fetchItemsFromAPI(category, page, color, size, gender),
    fetchSizeFilterByCategoryName(category),
    fetchAllColors(),
]);

  const initialFilters = {
    gender: waitedSearchParams.gender || "",
    size: waitedSearchParams.size ? waitedSearchParams.size.split(',').map(Number) : [],
    color: waitedSearchParams.color ? waitedSearchParams.color.split(',').map(Number) : [],
    price: waitedSearchParams.price ? waitedSearchParams.price.split(',').map(Number) : [0, 1000000]
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



export default async function ItemsPage({ params, searchParams }) {
  const page = parseInt(await searchParams?.page) || 1;
  return (
   
      <Suspense key={page} fallback={<LoadingAnimation />}>
        <ItemsPageContent params={params} searchParams={searchParams} />
      </Suspense>
    
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