import ItemsPageClient from "@/components/pageClients/itemsPageClient";
import { makeGetAPIcall, makePostAPIcall } from "@/utils/API_vendor";

async function fetchItemsFromAPI(category, page) {
  try {
    // Construct API URL dynamically
    const apiUrl = `http://localhost:8080/api/products/findProductsByCategoryName?categoryName=${category}&sortBy=product_price_local&sortOrder=ASC&page=${page}&limit=12`;

    // Make API call
    const response = await makeGetAPIcall(apiUrl);
    console.log("API Response:", response?.data);

    // Return processed response
    console.log("response?.data",response?.data)
    return {
      loading: false,
      data: response?.data
    };
  } catch (error) {
    console.error("Error fetching items:", error.message);

    // Handle errors gracefully
    return {
      loading: false,
      data: [],
    };
  }
}


async function fetchAllColors(){
  const apiUrl = `http://localhost:8080/api/filters/getAllColors`;
  const response  = await makeGetAPIcall(apiUrl)
  return response.data
  
}

async function fetchSizeFilterByCategoryName(categoryName){
  const apiUrl = `http://localhost:8080/api/filters/getSizeFilterByCatagory`
  const payload = {
    categoryName
  }
  const response = await makePostAPIcall(apiUrl,payload) ; 
  console.log("filter data", response);
  return response?.data
}

export default async function ItemsPage({ params, searchParams }) {
  const category = params?.category || "default-category"; // Extract category from URL
  const page = parseInt(searchParams?.page) || 1; // Extract page from query params

  console.log("Category:", category);
  console.log("searchParams:", searchParams);

  const ItemsData = await fetchItemsFromAPI(category, page);
  const allSizesPerCategory =  await fetchSizeFilterByCategoryName(category)
  const allColors =  await fetchAllColors();
  // console.log("initialItems", initialItems);
  console.log("allSizesPerCategory",allSizesPerCategory)

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
