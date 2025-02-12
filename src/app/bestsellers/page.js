"use server";
import LoadingAnimation from "@/components/loaders/LoadingAnimation";
import BestSellerPageClient from "@/components/pageClients/bestSellerPageClient";
import { makeGetAPIcall } from "@/utils/API_vendor";
import { Suspense } from "react";

// Create a component that fetches data and suspends
async function FetchItems({ gender }) {
  const ItemsData = await fetchItemsFromAPI(gender);
  return <BestSellerPageClient ItemsData={ItemsData} />;
}

export default async function BestSellerPage({ params, searchParams }) {
  const gender = searchParams.gender;

  return (
    <Suspense fallback={<LoadingAnimation />}>
      <FetchItems gender={gender} />
    </Suspense>
  );
}

async function fetchItemsFromAPI(gender) {
  const apiUrl = `http://localhost:8080/api/products/findBestSellerByGender?gender=${gender}`;
  console.log("apiUrl for fetchItemsFromAPI", apiUrl);
  const response = await makeGetAPIcall(apiUrl);
  return { loading: false, data: response?.data || [] };
}