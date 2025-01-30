import LoadingAnimation from "@/components/loaders/LoadingAnimation";
import ItemsPageClient from "@/components/pageClients/itemsPageClient";
import { makeGetAPIcall, makePostAPIcall } from "@/utils/API_vendor";
import { Suspense } from 'react'

// Separate data fetching components
async function ItemsPageContent({ params, searchParams }) {
  const category = params?.category || "default-category";
  const page = parseInt(searchParams?.page) || 1;

  // Fetch data in parallel where possible
  const [ItemsData, allSizesPerCategory, allColors] = await Promise.all([
    fetchItemsFromAPI(category, page),
    fetchSizeFilterByCategoryName(category),
    fetchAllColors(),
  ]);

  const initialFilters = {
    gender: "",
    size: [],
    color: [],
    price: [0, 1000000],
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
async function fetchItemsFromAPI(category, page) {
  const apiUrl = `http://localhost:8080/api/products/findProductsByCategoryName?categoryName=${category}&sortBy=product_price_local&sortOrder=ASC&limit=12&page=${page}`;
  const response = await makeGetAPIcall(apiUrl);
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