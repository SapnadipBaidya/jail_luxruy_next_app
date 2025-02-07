import CartPageClient from "@/components/pageClients/cartPageClient";
import { cookies } from "next/headers";

export default async function WishlistPage() {
  // Get the access token from cookies
  const cookieStore = await cookies();


  // Pass the fetched data and error to the client component
  return (
    <CartPageClient
    />
  );
}