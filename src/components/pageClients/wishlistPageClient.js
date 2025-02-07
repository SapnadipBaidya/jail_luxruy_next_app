"use client";
import React, { useEffect, useState } from 'react';
import GridWrapper from '../wrappers/GridWrapper';
import { fetchUserWishlist } from '@/utils/API_lib';


function WishListPageClient({ accessToken, itemsArr }) {
  const [wishlistData, setWishlistData] = useState([]);
  

  useEffect(() => {
    // Fetch wishlist data when the component mounts or accessToken changes
    const fetchData = async () => {
      try {
        const data = await fetchUserWishlist(); // Pass necessary arguments if required
        setWishlistData(data); // Update state with fetched data
        console.log("WishListPageClient: Data fetched successfully",data);
      } catch (error) {
        console.error("WishListPageClient: Error fetching wishlist data", error);
      }
    };

    fetchData();
  }, [fetchUserWishlist]); // Re-run effect if accessToken changes

  return (
    <div style={{ display: "flex", justifyContent: "center" ,minHeight:"100vh" }}>
      {/* Render GridWrapper with fetched data */}
      <GridWrapper type="Wishlist" itemsArr={wishlistData} accessToken={accessToken} setWishlistData={setWishlistData} />
    </div>
  );
}

export default WishListPageClient;

