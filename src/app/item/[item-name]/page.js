import LoadingAnimation from "@/components/loaders/LoadingAnimation";
import ProductDetail from "@/components/productDetailComponent/productDetail";
import { makeGetAPIcall } from "@/utils/API_vendor";
import { Suspense } from "react";

 async function ProductDetailPage({ params, searchParams }) {
  const waitedParams = await params;
  const waitedsearchParams = await searchParams;
  const pid = waitedsearchParams?.pid;
  const pdid = waitedsearchParams?.pdid;
  const productName = waitedParams['item-name']
  const response = await fetchProductFromAPI(productName, pid,pdid);
  const success = response.data.status;
  const data = response.data.responseData;
  console.log("ProductDetailPage",data)
  return (
  <ProductDetail data={data}/>
  );
}



export default async function ProductPage({ params, searchParams }) {
  return (
    
      <Suspense  fallback={<LoadingAnimation />}>
        <ProductDetailPage params={params} searchParams={searchParams} />
      </Suspense>
  );
}

async function fetchProductFromAPI(productName, pid,pdid) {
  const apiUrl = `http://localhost:8080/api/products/findProductsById?productName=${productName}&pid=${pid}&pdid=${pdid}`;
  console.log("apiUrl",apiUrl)
  const response = await makeGetAPIcall(apiUrl);
  return { loading: false, data: response?.data || [] };
}