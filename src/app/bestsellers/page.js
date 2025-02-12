import BestSellerPageClient from "@/components/pageClients/bestSellerPageClient";
import { makeGetAPIcall } from "@/utils/API_vendor";

export default async function BestSellerPage({ params, searchParams }) {
    const waitedSearchParams = await searchParams;
    const waitedParams = await params;
    console.log("waitedParams",waitedParams,"waitedSearchParams",waitedSearchParams)
    const gender = waitedSearchParams.gender
    const [ItemsData] = await Promise.all([
        fetchItemsFromAPI(gender),
      ]);

      console.log("ItemsData",ItemsData)


  // Pass the fetched data and error to the client component
  return (
   <BestSellerPageClient ItemsData={ItemsData}/>
  );
}


async function fetchItemsFromAPI(gender) {
  const apiUrl = `http://localhost:8080/api/products/findBestSellerByGender?gender=${gender}`;
  console.log("apiUrl for fetchItemsFromAPI", apiUrl);
  const response = await makeGetAPIcall(apiUrl);
  return { loading: false, data: response?.data || [] };
}