"use client";
import React, { useEffect, useState, useCallback } from 'react';
import GridWrapper from '../wrappers/GridWrapper';
import { fetchUserWishlist } from '@/utils/API_lib';
import TruckLoader from '../loaders/truckLoader';
import ThreeDotLoader from '../loaders/threeDotLoader';

function WishListPageClient({ accessToken, itemsArr }) {
  const [wishlistData, setWishlistData] = useState(itemsArr || []); // Initialize with itemsArr if provided
  const [wishlistLoading, setWishlistLoading] = useState(true);

  // Memoize the fetchData function to avoid unnecessary re-creations
  const fetchData = useCallback(async () => {
    setWishlistLoading(true);
    try {
      const data = await fetchUserWishlist(accessToken); // Pass accessToken if required
      setWishlistData(data);
      console.log("WishListPageClient: Data fetched successfully", data);
    } catch (error) {
      console.error("WishListPageClient: Error fetching wishlist data", error);
      // Optionally, set an error state here to display a user-friendly message
    } finally {
      setWishlistLoading(false); // Ensure wishlistLoading is set to false regardless of success or failure
    }
  }, [accessToken]); // Only recreate fetchData if accessToken changes

  useEffect(() => {
    fetchData();
  }, [fetchData]); // Run effect only when fetchData changes

  return (
    <div style={{ display: "flex",alignItems:"center", justifyContent: "center", minHeight: "90vh" }}>
      {wishlistLoading ? (
        <ThreeDotLoader />
      ) : (
        <GridWrapper
          type="Wishlist"
          itemsArr={wishlistData}
          accessToken={accessToken}
          setWishlistData={setWishlistData}
          setWishlistLoading={setWishlistLoading}
        />
      )}
    </div>
  );
}

export default WishListPageClient;