import ItemsPageClient from "@/components/pageClients/itemsPageClient";
import { makeGetAPIcall } from "@/utils/API_vendor";

async function fetchItemsFromAPI(category, page) {
  // Construct API URL dynamically based on category
  const apiUrl = `http://localhost:8080/api/products/findProductsByCategoryName?categoryName=${category}&sortBy=product_price_local&sortOrder=ASC&page=${page}&limit=20`;

  const res = makeGetAPIcall(apiUrl);
  const response = await res;
  console.log("Data", response.data);
  return response.data;
}

export default async function ItemsPage({ params, searchParams }) {
  const category = params?.category || "default-category"; // Extract category from URL
  const page = parseInt(searchParams?.page) || 1; // Extract page from query params

  console.log("Category:", category);
  console.log("searchParams:", searchParams);

  const initialItems = await fetchItemsFromAPI(category, page);
  console.log("initialItems", initialItems);

  const initialFilters = {
    gender: "",
    size: [],
    color: [],
    price: [0, 1000000],
  };

  return (
    <ItemsPageClient
      initialItems={initialItems}
      initialFilters={initialFilters}
      initialPage={page}
      category={category}
    />
  );
}
