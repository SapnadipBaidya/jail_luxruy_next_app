// app/wishlist/page.js
import WishListPageClient from "@/components/pageClients/wishlistPageClient";
import { cookies } from "next/headers";

export default async function WishlistPage() {
  // Get the access token from cookies
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;

  let wishlistData = null;

  // Fetch wishlist data from the API
  if (accessToken) {
    try {
      const response = await fetch("http://localhost:8080/api/wishlist/fetchUserWishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({}), // Add any required request body here
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch wishlist: ${response.statusText}`);
      }

      wishlistData = await response.json();
    } catch (err) {
      console.error("Error fetching wishlist:", err.message);
    }
  } else {
    error = "Access token is missing. Please log in.";
  }

  // Pass the fetched data and error to the client component
  return (
    <WishListPageClient
      accessToken={accessToken}
      itemsArr={wishlistData}
    />
  );
}