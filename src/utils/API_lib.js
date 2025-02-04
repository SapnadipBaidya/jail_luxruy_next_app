import { useCallback } from "react";
import axios from "axios";

const useWishlistApi = (accessToken) => {

    console.log("useWishlistApi",accessToken);
  const addOrEditWishlist = useCallback(async (productDetailsId, productId) => {
    if (!accessToken) {
      console.error("Access token is missing!");
      return;
    }

    console.log("proceeding to make API call",addOrEditWishlist)
    const apiUrl = "http://localhost:8080/api/wishlist/addOrEditWishlist";

    try {
      const response = await axios.post(
        apiUrl,
        {
          payloadObj: {
            productsDetailsId: productDetailsId,
            product_id: productId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Wishlist response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error adding/editing wishlist:", error.response?.data || error.message);
      throw error;
    }
  }, [accessToken]);

  return { addOrEditWishlist };
};

export default useWishlistApi;
