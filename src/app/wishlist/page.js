import { cookies } from "next/headers";

export default async function WishlistPage({ params, searchParams }) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;
  return (
   <> <h1>wishlist page</h1>
    <p>{accessToken}</p></>
      
   
    
  );
}