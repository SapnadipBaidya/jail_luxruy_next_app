import LoadingAnimation from "@/components/loaders/LoadingAnimation";
import ProductPageClient from "@/components/pageClients/productPageClient";
import { makeGetAPIcall } from "@/utils/API_vendor";
import { cookies } from "next/headers";
import { Suspense } from "react";

// Function to fetch product data
async function fetchProductFromAPI(productName, pid, pdid) {
  const apiUrl = `http://localhost:8080/api/products/findProductsById?productName=${productName}&pid=${pid}&pdid=${pdid}`;
  console.log("API URL:", apiUrl);
  const response = await makeGetAPIcall(apiUrl);
  return response?.data || {};
}

// Product Detail Page Component
async function ProductDetailPage({ params, searchParams }) {
  const cookieStore = await cookies();
  const accessToken = cookieStore?.get("accessToken")?.value || null;
  const waitedSearchParams = await searchParams;
  const waitedParams = await params;
  const pid = waitedSearchParams?.pid;
  const pdid = waitedSearchParams?.pdid;
  const productName = waitedParams?.["item-name"];

  const data = await fetchProductFromAPI(productName, pid, pdid);
  const success = data.status;

  if (!success) {
    return <div>Failed to load product details.</div>;
  }

  return (
    <> 
    <ProductPageClient data={data.responseData}  />
    </>
    
  );
}

// Main Product Page Component
export default function ProductPage({ params, searchParams }) {
  return (
    <Suspense fallback={<LoadingAnimation />}>
      <ProductDetailPage params={params} searchParams={searchParams} />
    </Suspense>
  );
}
